"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Registration Failed");
        setIsLoading(false);
        return;
      }
      setTimeout(() => {
        toast.success(
          "Registration successful. Please Check verify your email"
        );
        router.push("/verifyemail");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          placeholder="Enter your name"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" className="accent-blue-600" />
          Remember me
        </label>
        <Link className="text-blue-600 hover:underline" href="/forgot-password">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#7050ff] text-white py-2 rounded-lg hover:bg-[#7033ff] transition duration-200 font-semibold disabled:bg-gray-400"
      >
        {!isLoading ? "Sign Up" : "Creating New user..."}
      </button>

      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
    </form>
  );
}
export default RegisterForm;
