"use client";

import React, { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft }) {
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {timeLeft > 0 ? (
        <p className="text-sm text-center text-gray-600">
          ⏳ Code expires in{" "}
          <span className="font-semibold text-[#7033ff]">
            {formatTime(timeLeft)}
          </span>
        </p>
      ) : (
        <p className="text-sm text-center text-red-500">
          ❌ Code expired. Please{" "}
          <span
            className="underline cursor-pointer hover:text-[#7033ff]"
            onClick={() => alert("Resend OTP API call korte hobe")}
          >
            resend
          </span>{" "}
          to get a new one.
        </p>
      )}
    </>
  );
}
