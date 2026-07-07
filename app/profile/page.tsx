// app/profile/page.tsx
import ProfilePage from "@/components/auth/Profile";
import { APP_URL } from "@/utils/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface UserData {
  username: string;
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  count_access_class: number;
  count_flash_cart: number;
}

const profilePage = async () => {
  // check token
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const reqDevUrl = "http://localhost:3000/api/v2/profile/";
  const reqProdUrl = `${APP_URL}/api/v2/profile`;
  const reqUrl =
    process.env.NODE_ENV === "development" ? reqDevUrl : reqProdUrl;

  const res = await fetch(reqUrl, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    redirect("/login");
  }

  const result = await res.json();

  const userData: UserData = result.data;

  return <ProfilePage user={userData}></ProfilePage>;
};

export default profilePage;
