import SeasonsPage from "@/components/flashcards/SeasonsPage";
import { cookies } from "next/headers";

async function getSeasons(classId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch(
      `http://localhost:3000/api/v2/linter/${classId}/season`,
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
