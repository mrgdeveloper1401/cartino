import { RequestOtpForm } from "@/components/auth/RequestOtp";
import { PROD_JWT_URL, isDev } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const devReqUrl = "http://localhost:8000/v2/auth/request_otp/";
const prodDevUrl = PROD_JWT_URL;
const reqUrl = isDev ? devReqUrl : prodDevUrl;

export default async function RequestOtpPage() {
  // check validate token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };

  if (token) {
    // check token is valid
    const res = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (res.ok) {
      return redirect("/");
    }
  }

  return <RequestOtpForm />;
}
