// components/shop/ShopPage.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Store, User, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface LinterClass {
  id: number;
  title: string;
  study_field: string;
  author_name: string;
  cover_image: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LinterClass[];
}

export default function ShopPage({
  initialData,
}: {
  initialData: ApiResponse;
}) {
  const [data, setData] = useState<ApiResponse>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const loadPage = async () => {
    setIsLoading(true);
    try {
      if (initialData?.results) {
        setData(initialData);
      }
    } catch (error) {
      console.error("Pagination error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* بلوب‌های پس‌زمینه */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute top-40 -right-24 h-72 w-72 animate-pulse rounded-full bg-pink-500/20 blur-3xl" />

      {/* هدر */}
      <header className="relative z-10 px-6 pb-6 pt-14" dir="rtl">
        <h1 className="text-3xl font-black tracking-wide text-white">
          فروشگاه
        </h1>
        <p className="mt-2 text-sm font-medium text-white/70">
          {data.count} کلاس آموزشی
        </p>
      </header>

      {/* محتوای اصلی */}
      <main
        className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-4"
        dir="rtl"
      >
        {/* گرید کارت‌ها */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.results.map((item) => (
            <Link
              key={item.id}
              href={`/shop/${item.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
            >
              {/* تصویر */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  loading="eager"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
              </div>

              {/* محتوا */}
              <div className="space-y-2 p-4">
                <h3 className="line-clamp-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-purple-300">{item.study_field}</p>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span>👤</span>
                  <span>{item.author_name}</span>
                </div>
              </div>

              {/* اورلی هاور */}
              <div className="absolute inset-0 flex items-center justify-center bg-purple-600/0 opacity-0 transition-all duration-300 group-hover:bg-purple-600/20 group-hover:opacity-100">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <ChevronLeft className="text-white" size={24} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* دکمه‌های صفحه‌بندی */}
        {(data.next || data.previous) && (
          <div className="mt-8 flex items-center justify-center gap-4 pb-8">
            <button
              // onClick={() => data.previous && loadPage(data.previous)}
              disabled={!data.previous || isLoading}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={20} />
              <span>قبلی</span>
            </button>

            <button
              // onClick={() => data.next && loadPage(data.next)}
              disabled={!data.next || isLoading}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>بعدی</span>
              <ChevronLeft size={20} />
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
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
          {/* <Link
            href="/search"
            className="flex flex-col items-center gap-1 text-white/50 transition hover:text-white/80"
          >
            <Search size={22} />
            <span className="text-[10px]">جستجو</span>
          </Link> */}
          <Link
            href="/shop"
            className="flex flex-col items-center gap-1 text-purple-400"
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
