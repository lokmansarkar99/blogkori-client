"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // reset page
    router.push(`/blog?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <form
      className="flex justify-between max-w-lg max-sm:scale-75 mx-auto
 border border-gray-300 bg-white rounded overflow-hidden"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-gray-600 pl-4 outline-none"
      />
      <button
        type="submit"
        className=" rounded px-8 py-2 m-1.5
 hover:scale-105 transition-all cursor-pointer font-semibold bg-[#7050ff] text-white"
      >
        Search
      </button>
    </form>
  );
}
