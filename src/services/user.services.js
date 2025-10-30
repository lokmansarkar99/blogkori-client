"use server";

import { customFetch } from "@/services/customFetch";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_APP_SERVER;

// Helper function for error handling
async function handleFetch(url, options = {}) {
  const data = await customFetch(url, options);

  // Handle authentication errors
  if (!data?.success && data?.message === "expired access token") {
    redirect("/logout");
  }
  if (!data?.success && data?.message === "Invalid access token") {
    redirect("/login");
  }

  return data;
}

//  Get user profile
export async function getUserProfile() {
  const url = `${BASE_URL}/user/profile`;
  const options = {
    method: "GET",
    cache: "no-store" // Always fresh data
  };
  return handleFetch(url, options);
}

//  Upload avatar - Handle FormData separately for Cloudinary
export async function uploadAvatar(formData) {
  const url = `${BASE_URL}/user/upload/avater`;

  try {
    // Get access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    //  Manual fetch for FormData/multipart upload
    // Don't set Content-Type - browser will set it with boundary
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
        // ❌ Don't add Content-Type for FormData
      },
      body: formData // FormData object
    });

    const data = await response.json();

    // Handle authentication errors
    if (!data?.success && data?.message === "expired access token") {
      redirect("/logout");
    }
    if (!data?.success && data?.message === "Invalid access token") {
      redirect("/login");
    }

    //  Revalidate to refresh server component data
    if (data?.success) {
      revalidatePath("/user/dashboard");
    }

    return data;
  } catch (error) {
    console.error("Upload avatar error:", error);
    return {
      success: false,
      message: error.message || "Upload failed"
    };
  }
}

//  Update user profile (name, email)
export async function updateUserProfile(profileData) {
  const url = `${BASE_URL}/user/profile`;
  const options = {
    method: "PATCH",
    body: JSON.stringify(profileData) // { name, email }
  };

  const result = await handleFetch(url, options);

  if (result?.success) {
    revalidatePath("/user/dashboard");
  }

  return result;
}

//  Forget password (no auth required)
export async function forgetPassword(email) {
  const url = `${BASE_URL}/user/forget/password`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    return response.json();
  } catch (error) {
    console.error("Forget password error:", error);
    return {
      success: false,
      message: error.message || "Request failed"
    };
  }
}

//  Reset password (no auth required)
export async function resetPassword(token, newPassword) {
  const url = `${BASE_URL}/user/reset/password`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, newPassword })
    });

    return response.json();
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: error.message || "Reset failed"
    };
  }
}

// ========== USER POSTS ==========

//  Get all posts by logged-in user
export async function getUserPosts() {
  const url = `${BASE_URL}/post/my-post`;
  const options = {
    method: "GET",
    cache: "no-store"
  };
  return handleFetch(url, options);
}

//  Create new post (with image upload - FormData)
export async function createPost(formData) {
  const url = `${BASE_URL}/post/create`;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    // Don't set Content-Type - browser will set multipart/form-data with boundary
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData // FormData with image, title, content, categories
    });

    const data = await response.json();

    if (!data?.success && data?.message === "expired access token") {
      redirect("/logout");
    }
    if (!data?.success && data?.message === "Invalid access token") {
      redirect("/login");
    }

    // Revalidate posts page
    if (data?.message === "Post created successfully!") {
      revalidatePath("/user/posts");
      revalidatePath("/posts");
    }

    return data;
  } catch (error) {
    console.error("Create post error:", error);
    return {
      success: false,
      message: error.message || "Failed to create post"
    };
  }
}

//  Update post (text fields only - title, content, categories)
export async function updatePost(postId, postData) {
  const url = `${BASE_URL}/post/update/${postId}`;
  const options = {
    method: "PUT",
    body: JSON.stringify(postData) // { title, content, categories }
  };

  const result = await handleFetch(url, options);

  if (result?.message === "Post updated successfully!") {
    revalidatePath("/user/posts");
    revalidatePath(`/posts/${postId}`);
  }

  return result;
}

//  Update post image (FormData)
export async function updatePostImage(postId, formData) {
  const url = `${BASE_URL}/post/update-post-image/${postId}`;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      redirect("/login");
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData // FormData with image
    });

    const data = await response.json();

    if (!data?.success && data?.message === "expired access token") {
      redirect("/logout");
    }
    if (!data?.success && data?.message === "Invalid access token") {
      redirect("/login");
    }

    if (data?.success) {
      revalidatePath("/user/posts");
      revalidatePath(`/posts/${postId}`);
    }

    return data;
  } catch (error) {
    console.error("Update post image error:", error);
    return {
      success: false,
      message: error.message || "Failed to update image"
    };
  }
}

//  Delete post by user
export async function deletePost(postId) {
  const url = `${BASE_URL}/post/delete/${postId}`;
  const options = {
    method: "DELETE"
  };

  const result = await handleFetch(url, options);

  if (result?.success) {
    revalidatePath("/user/posts");
    revalidatePath("/posts");
  }

  return result;
}

//  Get user statistics (posts, likes, dislikes)
export async function getUserStats() {
  const url = `${BASE_URL}/user/stats`;
  const options = {
    method: "GET",
    cache: "no-store"
  };
  return handleFetch(url, options);
}
