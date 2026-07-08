import { LoginForm } from "@/components/auth/LoginForm";
import { PROD_JWT_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isDev = process.env.NODE_ENV === "development";
const devReqUrl = "http://localhost:8000/api/jwt/verify/";
const prodReqUrl = PROD_JWT_URL;
const reqUrl = isDev ? devReqUrl : prodReqUrl;

const loginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };
  if (token) {
    const req = await fetch(reqUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (req.ok) {
      redirect("/");
    }
  }

  return <LoginForm></LoginForm>;
};

export default loginPage;
