import { LoginForm } from "@/components/auth/LoginForm";
import { PROD_JWT_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };
  if (token) {
    const reqUrl = PROD_JWT_URL
    const req = await fetch(reqUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (req.ok) {
      return redirect("/");
    }
  }

  return <LoginForm></LoginForm>;
};

export default loginPage;
