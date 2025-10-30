import { getAllBlogPost } from "@/actions/post.action";
import BlogPost from "@/app/Components/BlogPost";
import CategorySelect from "@/app/Components/blog/CategorySelect";
import Pagination from "@/app/Components/blog/Pagination";
import SearchInput from "@/app/Components/blog/SearchInput";
import { Suspense } from "react";

export default async function BlogPage({ searchParams }) {
  const getSearchParams = await searchParams;
  const currentPage = Number(getSearchParams?.page) || 1;
  const category = getSearchParams?.category || "";
  const search = getSearchParams?.search || "";

  const blogsData = await getAllBlogPost({
    page: currentPage,
    search,
    category
  });

  const posts = blogsData?.posts || [];
  const totalPages = blogsData?.totalPages || 1;

  return (
    <div className="min-h-screen text-white p-4">
      {/* Page tittle blog page */}
      <h1 className="text-4xl mt-10 font-bold mb-7 text-center">
        All Blog <mark className="bg-transparent text-[#7050ff]">Posts</mark>
      </h1>
      {/* Search + Category Section */}
      <div className="mx-auto max-w-7xl px-2 sm:px-4 mb-10">
        <div className="flex flex-col items-center  justify-between gap-4 md:gap-6">
          {/* Search Input */}
          <div className="w-full md:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchInput />
            </Suspense>
          </div>

          {/* Category Buttons */}
          <div className="w-full md:w-1/2">
            <div className="">
              <Suspense fallback={<div>Loading...</div>}>
                <CategorySelect />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <BlogPost posts={posts} />

      {/* Pagination UI */}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
