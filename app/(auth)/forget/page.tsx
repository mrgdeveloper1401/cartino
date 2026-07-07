// app/(auth)/forgot
import { ForgetPasswordForm } from "@/components/auth/ForgetPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const forgetPassword = async () => {
  // check validate token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };
  if (token) {
    // check token is valid
    const res = await fetch("http://localhost:3000/api/v1/jwt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (res.ok) {
      return redirect("/");
    }
  }
  return <ForgetPasswordForm />;
};

export default forgetPassword;
