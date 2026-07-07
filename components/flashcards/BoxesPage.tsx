// components/flashcards.BoxesPage.tsx
"use client";

import Link from "next/link";
import { Home, Store, User, Boxes, ChevronRight } from "lucide-react";

interface Box {
  id: number;
  box_number: number;
}

interface Props {
  boxes: Box[];
  classId: string;
  seasonId: string;
}

// رنگ هر جعبه بر اساس شماره‌ش
const boxColors = [
  "from-emerald-500/30 to-emerald-700/20 border-emerald-400/30",
  "from-sky-500/30 to-sky-700/20 border-sky-400/30",
  "from-violet-500/30 to-violet-700/20 border-violet-400/30",
  "from-amber-500/30 to-amber-700/20 border-amber-400/30",
  "from-rose-500/30 to-rose-700/20 border-rose-400/30",
  "from-cyan-500/30 to-cyan-700/20 border-cyan-400/30",
];

export default function BoxesPage({ boxes, classId, seasonId }: Props) {
  // سورت بر اساس شماره‌ی جعبه
  const sortedBoxes = [...boxes].sort((a, b) => a.box_number - b.box_number);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* بلوب‌های پس‌زمینه */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute top-40 -right-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />

      {/* هدر */}
      <header className="relative z-10 px-6 pb-6 pt-14" dir="rtl">
        <Link
          href={`/flashcards/${classId}/season`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ChevronRight size={18} />
          بازگشت به فصل‌ها
        </Link>
        <h1 className="flex items-center gap-2 text-3xl font-black tracking-wide text-white">
          <Boxes className="text-orange-400" size={30} />
          جعبه‌های لایتنر
        </h1>
        <p className="mt-2 text-sm font-medium text-white/70">
          {sortedBoxes.length} جعبه موجود
        </p>
      </header>

      {/* محتوای اصلی */}
      <main
        className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4"
        dir="rtl"
      >
        {sortedBoxes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Boxes size={48} className="text-white/30" />
            <p className="mt-3 text-sm text-white/60">
              هیچ جعبه‌ای برای این فصل موجود نیست
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {sortedBoxes.map((box, idx) => (
              <Link
                key={box.id}
                href={`/flashcards/${classId}/season/${seasonId}/user_flash_cart?box=${box.box_number}`}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-2xl border bg-linear-to-br ${
                  boxColors[idx % boxColors.length]
                } shadow-xl backdrop-blur-md transition hover:scale-105 hover:shadow-2xl`}
              >
                <span className="text-xs font-medium text-white/60">جعبه</span>
                <span className="text-5xl font-black text-white drop-shadow-lg">
                  {box.box_number}
                </span>
                <div className="absolute bottom-3 opacity-0 transition-opacity group-hover:acity-100">
                  <span className="text-xs text-white/80">مطالعه ←</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* نوار پاین */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-around px-4 py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-white/50 transition hover:text-white/80"
          >
            <Home size={22} />
            <span className="text-[10px]">خانه</span>
          </Link>
          <Link
            href="/shop"
            className="flex flex-col items-center gap-1 text-white/50 transition hover:text-white/80"
          >
            <Store size={22} />
            <span className="text-[10px]">فروشگاه</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-1 text-white/50 transition hover:text-white/80"
          >
            <User size={22} />
            <span className="text-[10px]">پروفایل</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
