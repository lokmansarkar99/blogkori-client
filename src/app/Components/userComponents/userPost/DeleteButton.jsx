"use client";
import { deletePost } from "@/services/user.services";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

const DeleteButton = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function onDelete() {
    startTransition(async () => {
      try {
        const result = await deletePost(post._id);

        if (result?.success) {
          toast.success("Post deleted successfully!");
          setIsModalOpen(false);
        } else {
          toast.error(result?.message || "Failed to delete post");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(error.message || "An error occurred");
      }
    });
  }

  return (
    <>
      <button
        title="Delete post"
        aria-label={`Delete ${post.title}`}
        onClick={() => setIsModalOpen(true)}
        disabled={isPending}
        className="inline-flex items-center gap-1 px-3 py-1.5 text-gray-700 text-sm font-medium rounded-md disabled:opacity-50"
      >
        <TrashIcon className="w-4 h-4 hover:text-[#7050ff]" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl text-[#7050ff] text-center font-semibold mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-500">
              Are you sure you want to delete {post.title} ?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                disabled={isPending}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
