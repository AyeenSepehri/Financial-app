import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch("http://localhost:4000/transactions", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }), // این تضمین می‌کنه آبجکت صاف باشه
        });


        if (!res.ok) {
            return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("Error adding transaction", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
