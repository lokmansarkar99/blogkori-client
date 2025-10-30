"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Timer from "./Timer";

export default function VerifyEmailForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-email`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        switch (res.status) {
          case 401:
            if (data.message === "Token expired") {
              setError(
                "Verification code has expired. Please request a new one."
              );
            } else if (data.message === "Invalid code") {
              setError("Invalid verification code. Please try again.");
            } else {
              setError("Session expired. Please register again.");
              setTimeout(() => (window.location.href = "/register"), 3000);
            }
            break;
          default:
            setError(data.message || "Verification failed. Please try again.");
        }
      } else {
        setSuccess("Verification successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (err) {
      setError(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setCode(input);
  };

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <input
        type="text"
        maxLength={6}
        placeholder="••••••"
        value={code}
        onChange={handleChange}
        className="w-full px-4 py-4 bg-white text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7033ff] focus:border-[#7033ff] placeholder-gray-400 tracking-widest text-center text-lg font-mono"
        required
        disabled={timeLeft <= 0}
      />

      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />

      {success && (
        <p className="text-green-600 text-sm text-center font-medium">
          {success}
        </p>
      )}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading || timeLeft <= 0}
        className="w-full py-4 bg-[#7033ff] text-white font-semibold rounded-md hover:bg-[#5927d8] transition duration-200 disabled:opacity-60 shadow-md"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>
    </form>
  );
}
