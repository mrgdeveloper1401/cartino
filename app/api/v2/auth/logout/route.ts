// app/api/v2/auth/logout

import { response } from "@/utils/config";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // remove cookie
  cookieStore.delete("token");

  return response.json({ message: "خروج موفقیت‌آمیز بود" }, { status: 200 });
}
