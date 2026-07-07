import { LoginForm } from "@/components/auth/LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const loginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const reqBody = {
    token: token,
  };
  if (token) {
    const req = await fetch("http://localhost:3000/api/v1/jwt", {
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
