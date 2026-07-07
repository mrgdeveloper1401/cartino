import PurchasedClasses from "@/components/flashcards/PurchasedClasses";
import { cookies } from "next/headers";

async function getPurchasedClasses() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      "http://localhost:3000/api/v2/linter/purchased",
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
