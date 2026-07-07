import { cookies } from "next/headers";
import Link from "next/link";
import FlashcardsClient from "@/components/flashcards/FlashcardsClient";

interface Flashcard {
  id: number;
  box: number;
  question_text: string;
  answers_text: string;
  season_title: string;
  season: string;
}

interface FlashcardsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Flashcard[];
}

async function getFlashcards(
  classId: string,
  seasonId: string,
  box?: string,
  page?: string
): Promise<FlashcardsResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const params = new URLSearchParams();
    if (box) params.append("box", box);
    if (page) params.append("page", page);

    const queryString = params.toString() ? `?${params.toString()}` : "";

    const res = await fetch(
      `http://localhost:3000/api/v2/linter/${classId}/season/${seasonId}/user_flash_cart${queryString}`,
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    );

    if (!res.ok) return null;

    const result = await res.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export default async function UserFlashcardsPage({
  params,
  searchParams,
}: {
  params: Promise<{ fId: string; sId: string }>;
  searchParams: Promise<{ box?: string; page?: string }>;
}) {
  const { fId, sId } = await params;
  const { box, page } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const data = await getFlashcards(fId, sId, box, page);

  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-white text-xl mb-4">
            فلش‌کارتی یافت نشد لطفا برای سوالات جعبه‌های قبلی یا بعدی رو چک
            بفرمایید
          </p>
          <Link
            href={`/flashcards/${fId}/season/${sId}/box`}
            className="text-blue-300 hover:text-blue-200 underline"
          >
            بازگشت به باکس‌ها
          </Link>
        </div>
      </div>
    );
  }

  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(data.count / 20);

  return (
    <FlashcardsClient
      data={data}
      fId={fId}
      sId={sId}
      box={box}
      token={token}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
