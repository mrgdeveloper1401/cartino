// app/shop/page.tsx
import ShopPage from "@/components/shop/ShopPage";
import { APP_URL, response } from "@/utils/config";
import { cookies } from "next/headers";

interface LinterClass {
  id: number;
  title: string;
  study_field: string;
  author_name: string;
  cover_image: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinterClass[];
}

async function getShopData(): Promise<ApiResponse | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const reqDevUrl = "http://localhost:3000/api/v2/shop/";
    const reqProdUrl = `${APP_URL}/api/v2/shop`;
    const reqUrl =
      process.env.NODE_ENV === "development" ? reqDevUrl : reqProdUrl;

    const res = await fetch(reqUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const jsonData = await res.json();
    if (jsonData) {
      return jsonData;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const data = await getShopData();

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <p className="text-white">خطا در دریافت اطلاعات یا نیاز به ورود مجدد</p>
      </div>
    );
  }

  return <ShopPage initialData={data} />;
}
