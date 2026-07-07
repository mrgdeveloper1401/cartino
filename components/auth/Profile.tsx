// components/auth/Profile.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Wallet,
  ShoppingBag,
  Receipt,
  FileText,
  HelpCircle,
} from "lucide-react";

interface User {
  username: string;
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  // آمار (اگه از بک‌اند بیاد)
  quiz_count?: number;
  count_access_class: number;
  count_flash_cart: number;
}

export default function ProfilePage({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      fetch("/api/v2/auth/logout", {
        method: "POST",
      });
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const homePageRouter = () => {
    router.replace("/");
    router.refresh();
  };

  // استخراج اولین حرف نام برای آواتار
  const getInitial = () => {
    if (user.first_name) return user.first_name[0];
    if (user.username) return user.username[0];
    return "ک";
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>

      {/* Profile Container */}
      <div className="w-full max-w-2xl space-y-6 relative z-10">
        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-linear-to-br from-purple-400 to-[#e94560] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
              {getInitial()}
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-1">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.username}
              </h1>
              <p className="text-white/70 text-sm mb-3">
                {user.email || user.phone_number || "اطلاعات تماس موجود نیست"}
              </p>

              {/* Stats */}
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-white">
                    {user.quiz_count ?? "۰"}
                  </p>
                  <p className="text-white/60 text-xs">آزمون</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">
                    {user.count_flash_cart ?? "۰"}
                  </p>
                  <p className="text-white/60 text-xs">فلش‌کارت</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">
                    {user.count_access_class ?? "۰"}
                  </p>
                  <p className="text-white/60 text-xs">کلاس</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* کلاس‌های خریداری شده */}
          <a
            href="/profile/classes"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl shrink-0 group-hover:scale-110 transition-transform">
                📚
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  کلاس‌های من
                </h3>
                <p className="text-white/60 text-sm">
                  مشاهده کلاس‌های خریداری شده
                </p>
              </div>
            </div>
          </a>

          {/* ویرایش پروفایل */}
          <a
            href="/profile/edit"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl shrink-0 group-hover:scale-110 transition-transform">
                ✏️
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  ویرایش پروفایل
                </h3>
                <p className="text-white/60 text-sm">
                  تغییر اطلاعات حساب کاربری
                </p>
              </div>
            </div>
          </a>

          {/* کیف پول */}
          <a
            href="/profile/wallet"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">کیف پول</h3>
                <p className="text-white/60 text-sm">موجودی و تراکنش‌ها</p>
              </div>
            </div>
          </a>

          {/* سفارش‌ها */}
          <a
            href="/profile/orders"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">سفارش‌ها</h3>
                <p className="text-white/60 text-sm">مشاهده سفارشات</p>
              </div>
            </div>
          </a>

          {/* فهرست پرداخت‌ها */}
          <a
            href="/profile/payments"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  فهرست پرداخت‌ها
                </h3>
                <p className="text-white/60 text-sm">تاریخچه پرداخت‌ها</p>
              </div>
            </div>
          </a>

          {/* تیکت‌ها */}
          <a
            href="/profile/tickets"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl shrink-0 group-hover:scale-110 transition-transform">
                🎫
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">تیکت‌ها</h3>
                <p className="text-white/60 text-sm">پشتیبانی و درخواست‌ها</p>
              </div>
            </div>
          </a>

          {/* اعلانات */}
          <a
            href="/profile/notifications"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl relative"
          >
            {/* Badge - می‌تونی از user.notification_count استفاده کنی */}
            <div className="absolute top-3 right-3 w-6 h-6 bg-[#e94560] rounded-full flex items-center justify-center text-white text-xs font-bold">
              ۵
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-pink-400 to-[#e94560] rounded-xl flex items-center justify-center text-white text-xl shrink-0 group-hover:scale-110 transition-transform">
                🔔
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">اعلانات</h3>
                <p className="text-white/60 text-sm">
                  پیام‌ها و اطلاع‌رسانی‌ها
                </p>
              </div>
            </div>
          </a>

          {/* قوانین و شرایط */}
          <a
            href="/terms"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  قوانین و شرایط
                </h3>
                <p className="text-white/60 text-sm">مطالعه قوانین</p>
              </div>
            </div>
          </a>

          {/* سوالات متداول */}
          <a
            href="/faq"
            className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  سوالات متداول
                </h3>
                <p className="text-white/60 text-sm">راهنما و پرسش‌ها</p>
              </div>
            </div>
          </a>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full bg-[#e94560]/20 hover:bg-[#e94560]/30 backdrop-blur-xl text-white py-4 rounded-2xl border border-[#e94560]/30 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          {isLoading ? "در حال خروج..." : "خروج از حساب کاربری"}
        </button>
        {/* home */}
        <button
          onClick={homePageRouter}
          className="w-full bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}
