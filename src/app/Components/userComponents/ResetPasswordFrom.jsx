"use client";
import { useState } from "react";
import toast from "react-hot-toast";

function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPass) {
      setError("Your password and confirm password don't match!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/reset/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ token, newPassword: password })
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Password reset successful! You can now log in.");
        setSuccess("Password reset successful! You can now log in.");
        setPassword("");
        setConfirmPass("");
        router.push("/login");
      } else {
        setError(data.message || "Failed to reset password.");
        toast.error(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log({ token });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-600 font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            required
            className="border-2 border-[#7567b4] focus:outline-0 p-2 rounded"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            required
            className="border-2 border-[#7567b4] focus:outline-0 p-2 rounded"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            className="bg-[#7152fa] hover:bg-[#5c45c0] text-white py-2 rounded disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
