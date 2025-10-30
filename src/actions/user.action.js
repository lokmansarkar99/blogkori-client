"use server";

import { customFetch } from "@/services/customFetch";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// getData handles redirect itself
export async function getData({ url, options }) {
  const data = await customFetch(url, options);

  // If access token is invalid → redirect immediately
  if (!data?.success && data?.message === "expired access token") {
    redirect("/logout");
  }
  if (!data?.success && data?.message === "Invalid access token") {
    redirect("/login");
  }

  return data;
}

// getUser just calls getData; do NOT wrap redirect in try/catch
export async function getUser() {
  const url = `${process.env.NEXT_APP_SERVER}/user/profile`;
  const options = { method: "GET" };
  const data = await getData({ url, options });
  return data;
}
export async function addCommentByUser({ postId, content }) {
  const url = `${process.env.NEXT_APP_SERVER}/user/add/comment`;
  const options = { method: "POST", body: JSON.stringify({ postId, content }) };
  const data = await getData({ url, options });
  console.log(data, "adding comment");
  if (data.success) {
    revalidatePath(`/blog/${postId}`);
    revalidatePath(`/admin/allposts/${postId}`);
  }
  return data;
}

export async function addLikeByUser({ postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/like/${postId}/like`;
  const options = { method: "POST" };
  const data = await getData({ url, options });
  console.log(data, "adding comment");
  if (data.success) {
    revalidatePath(`/blog/${postId}`);
    revalidatePath(`/admin/allposts/${postId}`);
    revalidatePath(`/user`);
  }
  return data;
}
export async function addDisLikeByUser({ postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/like/${postId}/dislike`;
  const options = { method: "POST" };
  const data = await getData({ url, options });
  console.log(data, "adding comment");
  if (data.success) {
    revalidatePath(`/blog/${postId}`);
    revalidatePath(`/admin/allposts/${postId}`);
    revalidatePath(`/user`);
  }
  return data;
}
