import * as promptpay from 'ç';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
  try {
    const raw = await req.text();
    console.log("Raw body:", raw);

    const { mobileNumber, amount } = JSON.parse(raw);
    console.log("Parsed body:", { mobileNumber, amount });

    if (!mobileNumber) {
      return NextResponse.json({ error: "mobileNumber is required" }, { status: 400 });
    }

    const numAmount = parseFloat(amount);
    const payload = (promptpay as any).generatePayload(
      mobileNumber,
      { amount: isNaN(numAmount) ? undefined : numAmount }
    );

    console.log("Generated payload:", payload);

    return NextResponse.json({ payload });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: "Invalid JSON or internal error" }, { status: 400 });
  }
}



// Ensure this route is always dynamic
