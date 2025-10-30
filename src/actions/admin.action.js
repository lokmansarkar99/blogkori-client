"use server";

import { revalidatePath } from "next/cache";
import { getData } from "./user.action";

export async function getAllPendingPost() {
  const url = `${process.env.NEXT_APP_SERVER}/admin/get/pending-posts`;
  const options = { method: "GET" };

  const data = await getData({ url, options });

  return data;
}
export async function getWithoutPendingPost() {
  const url = `${process.env.NEXT_APP_SERVER}/admin/get/without-pending-posts`;
  const options = { method: "GET" };
  const data = await getData({ url, options });
  return data;
}

export async function getAllUsers() {
  const url = `${process.env.NEXT_APP_SERVER}/admin/users`;
  const options = { method: "GET" };

  const data = await getData({ url, options });

  return data;
}

export async function createUserByAdmin({ name, email, password }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/users/create`;
  const options = {
    method: "POST",
    body: JSON.stringify(name, email, password)
  };

  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath("/admin");
    revalidatePath("/admin/allusers");
  }

  return data;
}
export async function updateUserByAdmin({ userId, status }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/users/${userId}/status`;
  const options = { method: "PUT", body: JSON.stringify({ status }) };
  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath("/admin");
    revalidatePath("/admin/allusers");
  }
  return data;
}
export async function deleteUserById({ userId }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/users/${userId}`;
  const options = { method: "Delete" };
  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath("/admin");
    revalidatePath("/admin/allusers");
  }
  return data;
}
export async function changeRoleByAdmin({ userId, role }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/users/${userId}/role`;
  const options = { method: "PUT", body: JSON.stringify({ role }) };
  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath("/admin");
    revalidatePath("/admin/allusers");
  }
  return data;
}
export async function getAllPostForAdmmin() {
  const url = `${process.env.NEXT_APP_SERVER}/admin/posts`;
  const options = { method: "GET" };

  const data = await getData({ url, options });

  return data;
}
// delete post by admin
export async function deletePostByAdmin({ postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/post/${postId}`;
  const options = { method: "DELETE" };

  const data = await getData({ url, options });
  if (data.success) {
    revalidatePath("/blog");
    revalidatePath(`/blog/${postId}`);
  }

  return data;
}

export async function updatePostStatusByAdmin({ postId, status }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/posts/${postId}/status`;
  const options = { method: "PUT", body: JSON.stringify({ status }) };

  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath(`/admin/allposts`);
    revalidatePath(`/blog`);
  }

  return data;
}

export async function updateCommentSatusByAdmin({ commentId, status, postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/comments/${commentId}/status`;
  const options = { method: "PUT", body: JSON.stringify(status) };

  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath(`/blog/${postId}`);
    revalidatePath(`/admin/allposts/${postId}`);
  }

  return data;
}
export async function deleteCommentByAdmin({ commentId, postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/admin/comments/${commentId}`;
  const options = { method: "DELETE" };

  const data = await getData({ url, options });
  if (data?.success) {
    revalidatePath(`/blog/${postId}`);
    revalidatePath(`/admin/allposts/${postId}`);
  }

  return data;
}
