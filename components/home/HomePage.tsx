// components/home/HomePage.tsx
"use client";

import Link from "next/link";
import { BookOpen, Layers, Home, Store, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* بلوب‌های پس‌زمینه */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-40 -right-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />

      {/* هدر */}
      <header className="relative z-10 px-6 pb-12 pt-14 text-center">
        <h1 className="text-4xl font-black tracking-wide text-white">
          CARTINO
        </h1>
        <p className="mt-2 text-base font-medium text-white/70">
          فلش‌کارت‌های موسسه
        </p>
      </header>

      {/* محتوای اصلی */}
      <main
        className="relative z-10 mx-auto grid w-full max-w-2xl flex-1 grid-cols-2 gap-4 px-4 pb-28"
        dir="rtl"
      >
        {/* کارت ورود به آزمون */}
        <Link href="/quiz">
          <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
            {/* آیکون بالا */}
            <div className="flex items-center justify-center bg-linear-to-br from-blue-500/40 to-purple-600/40 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-white">
                <BookOpen size={32} />
              </div>
            </div>
            {/* متن پایین */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                ورود به آزمون
              </span>
              {/* <p className="text-sm font-semibold leading-relaxed text-white/80">
                آزمون ۴ گزینه‌ای رو از اینجا شروع کن
              </p> */}
            </div>
          </div>
        </Link>

        {/* کارت فلش‌کارت لایتنر */}
        <Link href="/flashcards">
          <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
            {/* آیکون بالا */}
            <div className="flex items-center justify-center bg-linear-to-br from-red-500/40 to-orange-500/40 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 text-white">
                <Layers size={32} />
              </div>
            </div>
            {/* متن پایین */}
            <div className="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center">
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                فلش‌کارت لایتنر
              </span>
              {/* <p className="text-sm font-semibold leading-relaxed text-white/80">
                شروع آزمون با فلش‌کارت‌های لایتنر
              </p> */}
            </div>
          </div>
        </Link>
      </main>

      {/* نوار پایین */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
        <div className="flex items-center justify-around px-4 py-3">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-blue-400"
          >
            <Home size={22} />
            <span className="text-[10px]">خانه</span>
          </Link>
          {/* <Link
            href="/search"
            className="flex flex-col items-center gap-1 text-white/50transition hover:text-white/80"
          >
            <Search size={22}/>
            <span className="text-[10px]">جستجو</span>
          </Link> */}
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
