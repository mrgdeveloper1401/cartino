// app/(auth)/forgot
import { ForgetPasswordForm } from "@/components/auth/ForgetPassword";
import { PROD_JWT_URL, isDev } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const devReqUrl = "http://localhost:8000/v2/auth/request_forget_password/";
const prodDevUrl = PROD_JWT_URL;
const reqUrl = isDev ? devReqUrl : prodDevUrl;

const forgetPassword = async () => {
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
      redirect("/");
    }
  }
  return <ForgetPasswordForm />;
};

export default forgetPassword;
