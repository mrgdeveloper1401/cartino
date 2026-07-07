import SeasonsPage from "@/components/flashcards/SeasonsPage";
import { APP_URL } from "@/utils/config";
import { cookies } from "next/headers";

async function getSeasons(classId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const appDevUrl = `http://localhost:3000/api/v2/linter/${classId}/season`
    const appProdUrl = `${APP_URL}/api/v2/linter/${classId}/season`
    const reqUrl = process.env.NODE_ENV === 'development' ? appDevUrl : appProdUrl;

    const response = await fetch(
      reqUrl,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
}

export default async function SeasonPage({
  params,
}: {
  params: Promise<{ fId: string }>;
}) {
  const { fId } = await params;
  const seasons = await getSeasons(fId);

  return <SeasonsPage seasons={seasons} classId={fId} />;
}
