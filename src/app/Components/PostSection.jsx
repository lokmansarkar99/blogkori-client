import PostCard from "./PostCard";
import Button from "./button";
import { posts } from "../damyData/post-damyData";

export default function PostSection() {
  return (
    <main className="min-h-screen bg-[#CDCEFB] py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#6D28D9]">
        Latest Posts
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>

      <Button />
    </main>
  );
}
