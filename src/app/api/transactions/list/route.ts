import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/features/transactions/types";


export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url, `http://${req.headers.get("host")}`);
        const sp = url.searchParams;

        const page = parseInt(sp.get("_page") || "1", 10);
        const limit = parseInt(sp.get("_limit") || "10", 10);

        const res = await fetch("http://localhost:4000/transactions");
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
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
