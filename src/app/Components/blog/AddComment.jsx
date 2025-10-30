"use client";

import { addCommentByUser } from "@/actions/user.action";
import { useState } from "react";
import toast from "react-hot-toast";

function AddComment({ post }) {
  const [content, setContent] = useState("");
  const [loading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return;
    try {
      setIsLoading(true);

      const res = await addCommentByUser({
        postId: post?._id,
        content
      });

      if (res.success) {
        toast.success("Comment added successfully");
      } else {
        toast.error("something went wrong when adding comment");
      }

      // clear text
      setContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add a Comment
      </h2>

      <div className="flex flex-col md:flex-col items-start gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7050ff] transition duration-200 placeholder-gray-500"
          rows={4}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-[#7050ff] text-white font-semibold rounded-lg hover:bg-[#623ffb] transition duration-200 shadow-sm disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}

export default AddComment;
