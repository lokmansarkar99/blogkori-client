import RegisterComponent from "@/app/Components/auth/register/RegisterComponent";
import RegisterForm from "@/app/Components/auth/register/RegisterForm";
import { isUser } from "@/services/verify.accessToken";
import { redirect } from "next/navigation";
import React from "react";

async function RegisterPage() {
  const getUser = await isUser();
  if (getUser.success) {
    if (getUser?.user.role === "user") {
      redirect("/user");
    } else {
      redirect("admin");
    }
  }
  return (
    <>
      <RegisterComponent>
        <RegisterForm />
      </RegisterComponent>
    </>
  );
}

export default RegisterPage;
