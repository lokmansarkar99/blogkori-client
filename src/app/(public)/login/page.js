import LoginComponent from "@/app/Components/auth/login/LoginComponent";
import LoginForm from "@/app/Components/auth/login/LoginForm";
import { isUser } from "@/services/verify.accessToken";
import { redirect } from "next/navigation";
import React from "react";

async function LoginPage() {
  const getUser = await isUser();
  if (getUser?.success) {
    if (getUser?.user.role === "user") {
      redirect("/user");
    } else {
      redirect("admin");
    }
  }
  return (
    <>
      <LoginComponent>
        <LoginForm />
      </LoginComponent>
    </>
  );
}

export default LoginPage;
