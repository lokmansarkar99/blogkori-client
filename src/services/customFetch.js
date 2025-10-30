import { cookies } from "next/headers";

export async function customFetch(url, options = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const fetchOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...options.headers
      }
    };
    const response = await fetch(url, fetchOptions);
    return response.json();
  } catch (error) {
    console.error({ error, message: "customFetch caught an error" });
  }
}
