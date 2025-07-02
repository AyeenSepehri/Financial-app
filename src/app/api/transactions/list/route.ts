import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/features/transactions/types";

// Retry function for better reliability
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return response;
            }
        } catch (error) {
            console.log(`Attempt ${i + 1} failed, retrying...`);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
    throw new Error(`Failed after ${retries} attempts`);
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url, `http://${req.headers.get("host")}`);
        const sp = url.searchParams;

        const page = parseInt(sp.get("_page") || "1", 10);
        const limit = parseInt(sp.get("_limit") || "10", 10);

        const jsonServerHost = process.env.JSON_SERVER_HOST || "http://localhost:4000";
        
        // Use retry logic for better reliability
        const res = await fetchWithRetry(`${jsonServerHost}/transactions`);
        const transactions = await res.json();

        let filtered: Transaction[] = transactions;

        // ======= status =======
        const status = sp.get("status");
        if (status && status !== "all") {
            filtered = filtered.filter((txn) => txn.status === status);
        }

        // ======= amount range =======
        const minAmount = sp.get("amount_gte");
        const maxAmount = sp.get("amount_lte");

        if (minAmount !== null && minAmount !== "") {
            filtered = filtered.filter((txn) => txn.amount >= parseFloat(minAmount));
        }
        if (maxAmount !== null && maxAmount !== "") {
            filtered = filtered.filter((txn) => txn.amount <= parseFloat(maxAmount));
        }

        // ======= date range =======
        const start = sp.get("start");
        const end = sp.get("end");
        if (start && end) {
            const startTime = new Date(start).getTime();
            const endTime = new Date(end).getTime();
            filtered = filtered.filter((txn) => {
                const txnTime = new Date(txn.timestamp).getTime();
                return txnTime >= startTime && txnTime <= endTime;
            });
        }

        // ======= merchant =======
        const merchant = sp.get("merchant");
        if (merchant && merchant !== "all") {
            filtered = filtered.filter((txn) => txn.merchant.id === merchant);
        }

        // ======= payment method =======
        const paymentMethod = sp.get("paymentMethod");
        if (paymentMethod && paymentMethod !== "all") {
            const [type, brand] = paymentMethod.split("-");
            filtered = filtered.filter(
                (txn) =>
                    txn.payment_method.type === type &&
                    txn.payment_method.brand === brand
            );
        }

        // ======= sorting =======
        const sortBy = sp.get("sortBy");
        const sortOrder = sp.get("sortOrder");

        if (sortBy && ["asc", "desc"].includes(sortOrder || "")) {
            filtered.sort((a: Transaction, b: Transaction) => {
                const aVal = (a as unknown as Record<string, unknown>)?.[sortBy];
                const bVal = (b as unknown as Record<string, unknown>)?.[sortBy];

                if (aVal === undefined || bVal === undefined) return 0;

                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
                }

                return sortOrder === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            });
        }


        // ======= bypass pagination =======
        const fetchAll = sp.get("_all");
        if (fetchAll === "true") {
            return NextResponse.json({
                data: filtered,
                total: filtered.length,
            });
        }

        // ======= pagination =======
        const startIdx = (page - 1) * limit;
        const endIdx = startIdx + limit;
        const paginated = filtered.slice(startIdx, endIdx);

        return NextResponse.json({
            data: paginated,
            total: filtered.length,
        });
    } catch (error) {
        console.error("[GET /api/transactions/list]", error);
        return NextResponse.json({ 
            error: "Internal Server Error",
            message: "Unable to connect to data source. Please try again."
        }, { status: 500 });
    }
}
