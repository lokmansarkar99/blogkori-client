import ResetPasswordFrom from "@/app/Components/userComponents/ResetPasswordFrom";

export default async function ResetPaswordPage({ params }) {
  const { token } = await params;

  return <ResetPasswordFrom token={token} />;
}
