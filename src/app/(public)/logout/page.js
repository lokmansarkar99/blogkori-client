"use client";
import { useLogout } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LogoutPage() {
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    logout();
  }, [router, logout]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        <h1 className="text-lg font-semibold text-gray-700">
          Logging you out...
        </h1>
        <p className="text-gray-500 text-sm">Please wait a moment.</p>
      </div>
    </div>
  );
}

export default LogoutPage;
