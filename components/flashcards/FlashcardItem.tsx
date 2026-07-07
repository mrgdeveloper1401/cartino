"use client";

import { useState } from "react";

interface FlashcardProps {
  cardId: number;
  question: string;
  answer: string;
  onAnswer: (cardId: number, isCorrect: boolean) => void;
  isAnswered: boolean;
}

export default function FlashcardItem({
  cardId,
  question,
  answer,
  onAnswer,
  isAnswered,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );

  const handleAnswerClick = (isCorrect: boolean) => {
    if (isAnswered) return;

    setFeedback(isCorrect ? "correct" : "incorrect");
    onAnswer(cardId, isCorrect);

    // پاک کردن feedback بعد از 1 ثانیه
    setTimeout(() => setFeedback(null), 1000);
  };

  return (
    <div className="relative w-full h-80 perspective-1000">
      {/* Feedback overlay */}
      {feedback && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl animate-fade-in">
          <div
            className={`text-6xl ${
              feedback === "correct" ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback === "correct" ? "✓" : "✗"}
          </div>
        </div>
      )}

      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front - سوال */}
        <div
          onClick={() => setIsFlipped(true)}
          className="absolute w-full h-full backface-hidden cursor-pointer"
        >
          <div className="w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl font-semibold text-white text-center">
                {question}
              </p>
            </div>
            <p className="text-white/50 text-sm text-center">
              کلیک کنید برای دیدن پاسخ
            </p>
          </div>
        </div>

        {/* Back - جواب */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div
              onClick={() => setIsFlipped(false)}
              className="flex-1 flex items-center justify-center cursor-pointer"
            >
              <p className="text-lg text-white text-center">{answer}</p>
            </div>

            {/* دکمه‌های پاسخ */}
            {!isAnswered ? (
              <div className="flex gap-3 mt-4" dir="rtl">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnswerClick(true);
                  }}
                  className="flex-1 bg-green-500/20 border border-green-400/30 rounded-xl px-4 py-3 text-green-300 hover:bg-green-500/30 transition-all font-medium"
                >
                  ✓ صحیح
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAnswerClick(false);
                  }}
                  className="flex-1 bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-3 text-red-300 hover:bg-red-500/30 transition-all font-medium"
                >
                  ✗ غلط
                </button>
              </div>
            ) : (
              <div className="mt-4 text-center text-white/50 text-sm">
                پاسخ داده شده ✓
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
