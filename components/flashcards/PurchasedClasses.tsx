// components/flashcards/PurchasedClasses.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface PurchasedClass {
  id: number;
  title: string;
  author_full_name: string;
  cover_image_url: string;
  study_field: string;
}

interface Props {
  initialData: PurchasedClass[];
}

export default function PurchasedClasses({ initialData }: Props) {
  if (!initialData || initialData.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
        <p className="text-white text-xl">هیچ کلاسی خریداری نشده است</p>
        <Link href={"/"} className="text-white text-xl mt-5 underline">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-6"
      dir="rtl"
    >
      <div className="flex gap-10">
        <h1 className="text-[16px] font-bold text-white mb-6">کلاس‌های من</h1>

        <Link href={"/"} className="text-white text-[16px] underline">
          بازگشت به صفحه اصلی
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {initialData.map((cls) => (
          <Link
            key={cls.id}
            href={`/flashcards/${cls.id}/season`}
            className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-white/20 hover:border-white/40 transition-all duration-300"
          >
            {/* تصویر کاور */}
            <div className="relative w-full h-80 aspect-video overflow-hidden bg-white/5">
              <Image
                src={cls.cover_image_url}
                alt={cls.title}
                fill
                loading="eager"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover  group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* متن */}
            <div className="p-3 text-white">
              <h2 className="text-sm font-bold mb-1 line-clamp-1">
                {cls.title}
              </h2>

              <div className="flex items-center gap-1 text-xs text-white/70mb-2">
                <span>مدرس:</span>
                <span className="text-white/90line-clamp-1">
                  {cls.author_full_name}
                </span>
              </div>

              <span className="inline-block text-xs bg-white/15 text-white/90 rounded-full px-2 py-0.5">
                {cls.study_field}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
