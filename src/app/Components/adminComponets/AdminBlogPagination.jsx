"use client";
import { useRouter, useSearchParams } from "next/navigation";

function AdminBlogPagination({ totalPages, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageClick = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(
      `${process.env.NEXT_PUBLIC_APP_URL}/admin/allposts?${params.toString()}`
    );
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default AdminBlogPagination;
