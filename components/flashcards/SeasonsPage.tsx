"use client";

import Image from "next/image";
import Link from "next/link";
import { Home, Store, User, BookOpen, ChevronRight } from "lucide-react";

interface Season {
  id: number;
  author_full_name: string;
  title: string;
  description: string;
  cover_image_url: string;
}

interface Props {
  seasons: Season[];
  classId: string;
}

export default function SeasonsPage({ seasons, classId }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* بلوب‌های پس‌زمینه */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute top-40 -right-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />

      {/* هدر */}
      <header className="relative z-10 px-6 pb-6 pt-14" dir="rtl">
        <Link
          href="/flashcards"
          className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ChevronRight size={18} />
          بازگشت به لیست کلاس‌ها
        </Link>
        <h1 className="text-3xl font-black tracking-wide text-white">
          فصل‌های کلاس
        </h1>
        <p className="mt-2 text-sm font-medium text-white/70">
          {seasons.length} فصل موجود
        </p>
      </header>

      {/* محتوای اصلی */}
      <main
        className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4"
        dir="rtl"
      >
        {seasons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen size={48} className="text-white/30" />
            <p className="mt-3 text-sm text-white/60">
              هیچ فصلی برای این کلاس موجود نیست
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {seasons.map((season) => (
              <Link
                key={season.id}
                href={`/flashcards/${classId}/season/${season.id}/box`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
              >
                {/* تصویر */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <Image
                    src={season.cover_image_url}
                    alt={season.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
                </div>

                {/* محتوا */}
                <div className="space-y-2 p-4">
                  <h3 className="text-lg font-bold text-white">
                    {season.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-white/70">
                    {season.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span>👤</span>
                    <span>{season.author_full_name}</span>
                  </div>
                </div>

                {/* اورلی هاور */}
                <div className="absolute inset-0 flex items-center justify-center bg-orange-600/0 opacity-0 transition-all duration-300 group-hover:bg-orange-600/20 group-hover:opacity-100">
                  <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                    <ChevronRight className="text-white" size={24} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* نوار پایین */}
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
