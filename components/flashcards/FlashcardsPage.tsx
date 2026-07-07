"use client";

import { useState } from "react";
import Link from "next/link";
import FlashcardItem from "./FlashcardItem";

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

interface Props {
  data: FlashcardsResponse;
  fId: string;
  sId: string;
  box?: string;
  currentPage: number;
  totalPages: number;
}

export default function FlashcardsClient({
  data,
  fId,
  sId,
  box,
  currentPage,
  totalPages,
}: Props) {
  const [displayMode, setDisplayMode] = useState<"grid" | "stack">("grid");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [showSummary, setShowSummary] = useState(false);
  const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());

  const handleAnswer = async (cardId: number, isCorrect: boolean, token?: string) => {
    // اگه قبلاً جواب داده، return
    if (answeredCards.has(cardId)) return;

    try {
      const res = await fetch("/api/v2/linter/student_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          flash_cart_id: cardId,
          is_correct: isCorrect,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to submit answer");

      // آپدیت stats
      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      // مارک کردن که جواب داده
      setAnsweredCards((prev) => new Set(prev).add(cardId));

      // در حالت stack به کارت بعدی برو
      if (displayMode === "stack") {
        if (currentCardIndex < data.results.length - 1) {
          setTimeout(() => setCurrentCardIndex(currentCardIndex + 1), 500);
        } else {
          // آخرین کارت بود، خلاصه نشون بده
          setTimeout(() => setShowSummary(true), 500);
        }
      }

      // هر ۱۰ تا خلاصه نشون بده (در حالت grid)
      if (displayMode === "grid" && answeredCards.size + 1 === 10) {
        setShowSummary(true);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const resetSummary = () => {
    setShowSummary(false);
    setStats({ correct: 0, incorrect: 0 });
    setAnsweredCards(new Set());
    setCurrentCardIndex(0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between" dir="rtl">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">فلش‌کارت‌ها</h1>
            <p className="text-white/80">
              {data.results[0]?.season_title || "فصل"}
              {box ? ` - جعبه ${box}` : ""}
            </p>
            <p className="text-white/60 text-sm mt-1">
              تعداد کل: {data.count} فلش‌کارت • صفحه {currentPage} از{" "}
              {totalPages}
            </p>
            {/* نمایش Stats */}
            {(stats.correct > 0 || stats.incorrect > 0) && (
              <p className="text-green-300 text-sm mt-2">
                ✓ {stats.correct} صحیح • ✗ {stats.incorrect} غلط
              </p>
            )}
          </div>

          <div className="flex gap-3">
            {/* دکمه تغییر چیدمان */}
            <button
              onClick={() =>
                setDisplayMode((prev) => (prev === "grid" ? "stack" : "grid"))
              }
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-all text-sm"
            >
              {displayMode === "grid" ? "📚 حالت تک‌کارت" : "🎴 حالت شبکه"}
            </button>

            <Link
              href={`/flashcards/${fId}/season/${sId}/box`}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all"
            >
              بازگشت
            </Link>
          </div>
        </div>

        {/* خلاصه Modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                خلاصه عملکرد شما
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-green-300 text-xl">
                  ✓ پاسخ صحیح: {stats.correct}
                </p>
                <p className="text-red-300 text-xl">
                  ✗ پاسخ غلط: {stats.incorrect}
                </p>
                <p className="text-white/80">
                  درصد موفقیت:{" "}
                  {Math.round(
                    (stats.correct / (stats.correct + stats.incorrect)) * 100
                  )}
                  %
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={resetSummary}
                  className="bg-blue-500/20 border border-blue-400/30 rounded-xl px-6 py-3 text-white hover:bg-blue-500/30 transition-all"
                >
                  ادامه
                </button>
                <Link
                  href={`/flashcards/${fId}/season/${sId}/box`}
                  className="bg-white/10 border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all"
                >
                  بازگشت
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid Mode */}
        {displayMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((card) => (
              <FlashcardItem
                key={card.id}
                cardId={card.id}
                question={card.question_text}
                answer={card.answers_text}
                onAnswer={handleAnswer}
                isAnswered={answeredCards.has(card.id)}
              />
            ))}
          </div>
        )}

        {/* Stack Mode */}
        {displayMode === "stack" && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <p className="text-white/80 text-center mb-4">
                کارت {currentCardIndex + 1} از {data.results.length}
              </p>
              <FlashcardItem
                cardId={data.results[currentCardIndex].id}
                question={data.results[currentCardIndex].question_text}
                answer={data.results[currentCardIndex].answers_text}
                onAnswer={handleAnswer}
                isAnswered={answeredCards.has(
                  data.results[currentCardIndex].id
                )}
              />
            </div>

            {/* Navigation در حالت Stack */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  setCurrentCardIndex(Math.max(0, currentCardIndex - 1))
                }
                disabled={currentCardIndex === 0}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                قبلی
              </button>
              <button
                onClick={() =>
                  setCurrentCardIndex(
                    Math.min(data.results.length - 1, currentCardIndex + 1)
                  )
                }
                disabled={currentCardIndex === data.results.length - 1}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                بعدی
              </button>
            </div>
          </div>
        )}

        {/* Pagination (فقط در حالت grid) */}
        {displayMode === "grid" && (data.next || data.previous) && (
          <div className="mt-8 flex justify-center gap-4" dir="rtl">
            {data.previous ? (
              <Link
                href={`/flashcards/${fId}/season/${sId}/user_flash_cart?${new URLSearchParams(
                  {
                    ...(box && { box }),
                    page: String(currentPage - 1),
                  }
                ).toString()}`}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all"
              >
                صفحه قبل
              </Link>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white/30 cursor-not-allowed">
                صفحه قبل
              </div>
            )}

            {data.next ? (
              <Link
                href={`/flashcards/${fId}/season/${sId}/user_flash_cart?${new URLSearchParams(
                  {
                    ...(box && { box }),
                    page: String(currentPage + 1),
                  }
                ).toString()}`}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 text-white hover:bg-white/20 transition-all"
              >
                صفحه بعد
              </Link>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white/30 cursor-not-allowed">
                صفحه بعد
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
