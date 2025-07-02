import { NextRequest, NextResponse } from "next/server";

// Retry function for better reliability
async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed, retrying...`);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
    throw new Error(`Failed after ${retries} attempts`);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Adding transaction:", body);

        const jsonServerHost = process.env.JSON_SERVER_HOST || "http://localhost:4000";
        
        // Use retry logic for better reliability
        const res = await fetchWithRetry(`${jsonServerHost}/transactions`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...body }),
        });

        console.log("JSON Server response status:", res.status);

        let data = null;
        try {
            data = await res.json();
            console.log("JSON Server response data:", data);
        } catch (parseError) {
            console.error("Failed to parse JSON response:", parseError);
            data = null;
        }

        if (res.ok) {
            // If response is successful (2xx status), return the data
            return NextResponse.json(data, { status: res.status });
        }

        // If response is not successful, return error with original status
        return NextResponse.json(
            { error: "Failed to add transaction", details: data },
            { status: res.status }
        );
    } catch (err) {
        console.error("Error adding transaction", err);
        return NextResponse.json({ 
            error: "Internal server error",
            message: "Unable to connect to data source. Please try again."
        }, { status: 500 });
    }
}
