"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Logout successful");
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Try again.");
    }
  };

  return logout;
}
