import BoxesPage from "@/components/flashcards/BoxesPage";
import { APP_URL } from "@/utils/config";
import { cookies } from "next/headers";

interface Box {
  id: number;
  box_number: number;
}

async function getBoxes(classId: string, seasonId: string): Promise<Box[]> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const reqDevUrl = `http://localhost:3000/api/v2/linter/${classId}/season/${seasonId}/box`;
    const reqProdUrl = `${APP_URL}/api/v2/linter/${classId}/season/${seasonId}/box`;
    const reqUrl =
      process.env.NODE_ENV === "development" ? reqDevUrl : reqProdUrl;

    const res = await fetch(reqUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    return result.success ? result.data : [];
  } catch (error) {
    return [];
  }
}

export default async function BoxPage({
  params,
}: {
  params: Promise<{ fId: string; sId: string }>;
}) {
  const { fId, sId } = await params;
  const boxes = await getBoxes(fId, sId);

  return <BoxesPage boxes={boxes} classId={fId} seasonId={sId} />;
}
