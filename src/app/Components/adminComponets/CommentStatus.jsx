"use client";

import {
  deleteCommentByAdmin,
  updateCommentSatusByAdmin
} from "@/actions/admin.action";
import { useState } from "react";
import toast from "react-hot-toast";

function CommentStatus({ comment }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const status = comment?.status === "suspended" ? "approved" : "suspended";

  async function handleDelete() {
    try {
      setIsDeleting(true);
      const res = await deleteCommentByAdmin({
        commentId: comment._id,
        postId: comment?.postId
      });
      // Success toast / refresh if needed
      if (res?.success) {
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Comment deletion failed");
      }
    } catch (error) {
      console.error(error);
      // show toast error
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleStatusChange() {
    try {
      setIsUpdating(true);
      const res = await updateCommentSatusByAdmin({
        commentId: comment?._id,
        postId: comment?.postId,
        status
      });
      // success toast
      if (res?.success) {
        toast.success("Comment status updated successfully");
      } else {
        toast.error("Comment status update failed");
      }
    } catch (error) {
      console.error(error);
      // show toast error
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={handleStatusChange}
        disabled={isUpdating}
        className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition disabled:opacity-60"
      >
        {isUpdating
          ? comment?.status === "suspended"
            ? "Unsuspending..."
            : "Suspending..."
          : comment?.status === "suspended"
          ? "Unsuspend"
          : "Suspend"}
      </button>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default CommentStatus;
