"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [payload, setPayload] = useState("");

  const generateQR = async () => {
    if (!mobileNumber.trim()) {
  alert("กรุณากรอกเบอร์ PromptPay");
  return;
}


    const res = await fetch("/api/generate-promptpay", {
  method: "POST",
  body: JSON.stringify({ mobileNumber, amount }),
  headers: { "Content-Type": "application/json" },
});

    const data = await res.json();
    setPayload(data.payload);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>สร้าง PromptPay QR</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          เบอร์ PromptPay:{" "}
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="เช่น 0812345678"
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          จำนวนเงิน (บาท):{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="เช่น 50"
          />
        </label>
      </div>

      <button onClick={generateQR}>สร้าง QR Code</button>

      {payload && (
        <div style={{ marginTop: "2rem" }}>
          <h3>QR PromptPay</h3>
          <QRCodeCanvas value={payload} size={256} />
        </div>
      )}
    </main>
  );
}
