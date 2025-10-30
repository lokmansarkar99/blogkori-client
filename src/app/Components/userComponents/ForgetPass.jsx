"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
function ForgetPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (!email) {
      setErrorMessage("Please enter an email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/forget/password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ email })
        }
      );

      const data = await res?.json();
      console.log(data);

      if (data?.success) {
        setEmail("");
        toast.success(data?.message);
        setSuccessMessage(
          "Reset link sent successfully! Please check your email inbox or spam"
        );
      } else {
        toast.error(data?.message);
        setErrorMessage(data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send reset link. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-10 text-center text-gray-800">
          Enter your Email
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#614bc4]"
            required
            aria-label="email"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-[#614bc4] text-white font-medium hover:bg-[#4f3aa1] disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {/* ✅ Error message */}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}

          <div className="text-sm">
            <Link href="/login" className="text-indigo-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
