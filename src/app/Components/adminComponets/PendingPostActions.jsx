"use client";

import { useState } from "react";
import { Check, Ban, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  deletePostByAdmin,
  updatePostStatusByAdmin,
} from "@/actions/admin.action";

export default function PendingPostActions({ post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const suspended = post?.status === "suspended";

  const handleApprove = async () => {
    try {
      const res = await updatePostStatusByAdmin({
        postId: post?._id,
        status: "approved",
      });
      if (res.success) {
        toast.success("Post approved successfully!");
      } else {
        toast.error("Failed to approve the post.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deletePostByAdmin({ postId: post?._id });
      if (res.success) {
        toast.success("Post deleted successfully!");
        setIsModalOpen(false);
      } else {
        toast.error("Failed to delete the post.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={handleApprove}
          title="Make Approve Post"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-green-600 text-sm font-medium rounded-md hover:bg-green-100 focus:outline-none transition"
        >
          <Check />
        </button>
        {suspended && (
          <button
            disabled={suspended}
            title="Suspend Post"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-red-600 text-sm font-medium rounded-md focus:outline-none transition"
          >
            <Ban />
          </button>
        )}

        <button
          onClick={handleDelete}
          title="Delete Post"
          className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-600 text-sm font-medium rounded-md hover:bg-gray-100 focus:outline-none transition"
        >
          <Trash2 />
        </button>
      </div>

      {/* Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl text-[#7050ff] text-center font-semibold mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-500">
              Are you sure you want to delete "{post.title}"?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
