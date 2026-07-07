// app/profile/page.tsx
import ProfilePage from "@/components/auth/Profile";
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

  const res = await fetch('http://localhost:3000/api/v2/profile/', {
    method: "GET",
    headers: { 
      "Content-type": "application/json",  
      "Authorization": `Bearer ${token}`
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
