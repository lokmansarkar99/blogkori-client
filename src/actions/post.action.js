"use server";

import { getData } from "./user.action";

export async function getAllBlogPost({ page, search, category }) {
  const url = `${process.env.NEXT_APP_SERVER}/post/get?page=${page}&search=${search}&category=${category}`;
  const options = {
    method: "GET",
    next: {
      tags: ["blog-posts"],
      revalidate: 60,
    },
  };

  const data = await getData({ url, options });

  return data;
}

export async function getSinglePost({ postId }) {
  const url = `${process.env.NEXT_APP_SERVER}/post/get/${postId}`;
  const options = { method: "GET" };

  const data = await getData({ url, options });

  return data;
}
