import VerifyEmailComp from "@/app/Components/auth/verifyEmail/VerifyEmailComp";
import VerifyEmailForm from "@/app/Components/auth/verifyEmail/VerifyEmailForm";
import { isUser } from "@/services/verify.accessToken";
import { redirect } from "next/navigation";
import React from "react";

async function VerifyEmailPage() {
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
      <VerifyEmailComp>
        <VerifyEmailForm />
      </VerifyEmailComp>
    </>
  );
}

export default VerifyEmailPage;
