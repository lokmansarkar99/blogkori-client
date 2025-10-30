"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 dark:bg-gray-900 text-red-600 dark:text-red-400">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6">
        {error?.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
