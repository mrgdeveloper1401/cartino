import PurchasedClasses from "@/components/flashcards/PurchasedClasses";
import { APP_URL } from "@/utils/config";
import { cookies } from "next/headers";

const APP_PROD_URL = `${APP_URL}/api/v2/linter/purchased`
const APP_DEV_URL = 'http://localhost:3000/api/v2/linter/purchased'
const REQ_URL = process.env.NODE_ENV === 'development' ? APP_DEV_URL : APP_PROD_URL;

async function getPurchasedClasses() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      REQ_URL,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    if (!response.ok) return [];
    const result = await response.json();
    return result.data ?? result.results ?? result ?? [];
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const classes = await getPurchasedClasses();
  return <PurchasedClasses initialData={classes} />;
}
