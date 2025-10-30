import { isUser } from "@/services/verify.accessToken";
import Link from "next/link";
import CommentCard from "./CommentCard";
import AddComment from "./blog/AddComment";
import AddLikeOrDislike from "./blog/AddLikeOrDislike";

export default async function PostContent({ post, isAdmin = false }) {
  const userData = await isUser();
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 py-10 bg-white text-gray-700 rounded-2xl shadow-lg">
      {/* Hero Image */}
      <div className="relative w-full h-72 rounded-2xl shadow-lg overflow-hidden">
        <img
          src={post?.imageUrl}
          alt={post.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
          <span className="bg-purple-700/90 text-white text-sm px-3 py-1 rounded-full">
            {post.categories}
          </span>
        </div>
      </div>

      {/* Title & Meta */}
      <h1 className="text-3xl sm:text-4xl font-bold mt-6 text-gray-800">
        {post.title}
      </h1>
      <div className="flex flex-wrap justify-between items-center mt-3 text-sm text-gray-500">
        <p>
          Published on:{" "}
          <span className="font-medium text-gray-400">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </span>
        </p>
        <p>
          Updated:{" "}
          <span className="text-gray-400">
            {new Date(post.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </span>
        </p>
      </div>

      {/* Content */}
      <div className="mt-8 text-gray-700 leading-relaxed text-lg">
        {post.content}
      </div>

      {/* Like / Dislike */}

      <AddLikeOrDislike post={post} user={userData?.user} />

      {/* Add Comment UI */}

      {!isAdmin && <AddComment post={post} />}

      {/* Comments */}
      <div className="mt-8">
        <CommentCard comments={post?.comments} isAdmin={isAdmin} />
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link
          href="/"
          className="inline-block bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
