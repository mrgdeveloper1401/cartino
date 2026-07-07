import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { VerifyOtpForm } from "@/components/auth/VerifyOtpForm";
import { PROD_JWT_URL } from "@/utils/config";

export default async function VerifyOtpPage() {
  // check validate token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };
  if (token) {
    // check token is valid
    const res = await fetch(PROD_JWT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (res.ok) {
      return redirect("/");
    }
  }

  if (!cookieStore.get("otp_phone")) {
    redirect("/otp");
  }

  return <VerifyOtpForm otp_phone={cookieStore.get("otp_phone")?.value} />;
}
