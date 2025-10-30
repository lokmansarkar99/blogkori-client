"use client";
import {
  deletePostByAdmin,
  updatePostStatusByAdmin
} from "@/actions/admin.action";
import { Ban, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

function PostEditAndDeleteButton({ post }) {
  const [modal, setModal] = useState({ isOpen: false, type: null });
  const [isDeleting, startDeleting] = useTransition();
  const [isSuspending, startSuspending] = useTransition();

  const handleConfirm = () => {
    if (modal.type === "delete") {
      startDeleting(async () => {
        try {
          const res = await deletePostByAdmin({ postId: post._id });
          if (res.success) {
            toast.success("Post deleted successfully");
          } else {
            toast.error("Something went wrong, cannot delete post");
          }
        } catch (error) {
          toast.error("Error deleting post");
        }
      });
    }

    if (modal.type === "suspend") {
      startSuspending(async () => {
        try {
          const res = await updatePostStatusByAdmin({
            postId: post._id,
            status: "suspended"
          });
          if (res.success) {
            toast.success("Post suspended successfully");
          } else {
            toast.error("Something went wrong, cannot suspend post");
          }
        } catch (error) {
          toast.error("Error suspending post");
        }
      });
    }

    setModal({ isOpen: false, type: null });
  };

  const handleOpen = (type) => setModal({ isOpen: true, type });
  const handleClose = () => setModal({ isOpen: false, type: null });

  const actionText = modal.type === "delete" ? "Delete Post" : "Suspend Post";
  const actionColor =
    modal.type === "delete"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-yellow-500 hover:bg-yellow-600";

  return (
    <>
      {/* Buttons */}
      <div className="flex gap-2">
        {/* Suspend Button */}
        <button
          onClick={() => handleOpen("suspend")}
          title="Suspend post"
          aria-label={`Suspend ${post.title}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-white text-sm font-medium rounded-md focus:outline-none"
        >
          <Ban
            className={`w-4 h-4 ${
              post.status === "suspended" ? "text-red-600" : "text-gray-600"
            } hover:text-[#7050ff]`}
          />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleOpen("delete")}
          title="Delete post"
          aria-label={`Delete ${post.title}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-white text-sm font-medium rounded-md focus:outline-none"
        >
          <Trash2 className="w-4 h-4 text-gray-600 hover:text-[#7050ff]" />
        </button>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl text-[#7050ff] text-center font-semibold mb-4">
              Confirm {actionText}
            </h2>
            <p className="text-gray-500 text-center">
              Are you sure you want to{" "}
              {modal.type === "delete" ? "delete" : "suspend"} {post.title}?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded text-white ${actionColor}`}
              >
                {modal.type === "delete" ? "Delete" : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostEditAndDeleteButton;
