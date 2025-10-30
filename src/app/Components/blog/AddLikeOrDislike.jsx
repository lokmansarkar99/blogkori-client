"use client";
import { addDisLikeByUser, addLikeByUser } from "@/actions/user.action";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function AddLikeOrDislike({ post, user }) {
  const [likes, setLikes] = useState(post?.likes || []);
  const [dislikes, setDislikes] = useState(post?.dislikes || []);
  const [loading, setLoading] = useState(false);

  const isLiked = likes?.some((like) => like?._id === user?.id);
  const isDisliked = dislikes?.some((d) => d?._id === user?.id);

  const likeCount = likes.length;
  const dislikeCount = dislikes.length;

  async function handleLike() {
    if (!user) return toast.error("Please login to like ❤️");

    try {
      setLoading(true);
      const res = await addLikeByUser({ postId: post?._id });

      if (res?.success) {
        if (isLiked) {
          setLikes(likes.filter((l) => l._id !== user.id));
          toast.success("You removed your like 👍");
        } else {
          setLikes([...likes, { _id: user.id }]);

          // remove dislike if exists
          if (isDisliked)
            setDislikes(dislikes.filter((d) => d._id !== user.id));

          toast.success("You liked this post 🎉");
        }
      } else {
        toast.error("Failed to update like");
      }
    } catch (error) {
      toast.error("Something went wrong 🚫");
    } finally {
      setLoading(false);
    }
  }

  async function handleDislike() {
    if (!user) return toast.error("Please login to dislike ⚠️");

    try {
      setLoading(true);
      const res = await addDisLikeByUser({ postId: post?._id });

      if (res?.success) {
        if (isDisliked) {
          setDislikes(dislikes.filter((d) => d._id !== user.id));
          toast.success("You removed your dislike 👎");
        } else {
          setDislikes([...dislikes, { _id: user.id }]);

          // remove like if exists
          if (isLiked) setLikes(likes.filter((l) => l._id !== user.id));

          toast.success("You disliked this post ❗");
        }
      } else {
        toast.error("Failed to update dislike");
      }
    } catch (error) {
      toast.error("Something went wrong 🚫");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2 flex gap-2 items-center">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition disabled:opacity-50 ${
          isLiked ? "text-blue-500 font-semibold" : ""
        }`}
      >
        <ThumbsUp /> {likeCount}
      </button>

      <button
        onClick={handleDislike}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition disabled:opacity-50 ${
          isDisliked ? "text-red-500 font-semibold" : ""
        }`}
      >
        <ThumbsDown /> {dislikeCount}
      </button>
    </div>
  );
}

export default AddLikeOrDislike;
