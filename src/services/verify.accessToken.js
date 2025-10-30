import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function isUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore?.get("accessToken")?.value;
    if (!accessToken) {
      return {
        success: false,
        message: "no access token found",
      };
    }
    const user = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    return { success: true, user };
  } catch (error) {
    console.log("jwt verification faild in client");
    return {
      success: false,
      message: "jwt verification faild in client",
    };
  }
}
