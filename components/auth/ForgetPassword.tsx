"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  forgetPassword,
  type ForgetPasswordValue,
} from "@/lib/validations/auth";
import Link from "next/link";
import { useRouter } from "next/compat/router";

export function ForgetPasswordForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordValue>({
    resolver: zodResolver(forgetPassword),
    defaultValues: { phone_number: "" },
  });

  async function onSubmit(data: ForgetPasswordValue) {
    setServerError(null);
    try {
      const res = await fetch("/api/v2/auth/request_forget_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setServerError(result.message || "خطا در ارسال کد");
        return;
      }

      setSuccess(true);
      router?.replace("/reset-password");
    } catch {
      setServerError("خطای ارتباط با سرور");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* شکل‌های پس‌زمینه انیمیشنی */}
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/30 blur-3xl" />

      {/* کارت شیشه‌ای */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">فراموشی رمز عبور</h1>
          <p className="mt-2 text-sm text-white/60">
            شماره موبایل خود را وارد کنید تا لینک بازیابی رمز عبور ارسال شود
          </p>
        </div>

        {success ? (
          <div className="rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-200">
            کد بازیابی برای شما ارسال شد. لطفاً پیامک‌های خود را بررسی کنید.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            dir="rtl"
          >
            <div>
              <label
                htmlFor="phone_number"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                شماره موبایل
              </label>
              <input
                id="phone_number"
                type="tel"
                inputMode="numeric"
                placeholder="09123456789"
                autoComplete="tel"
                {...register("phone_number")}
                className="w-full rounded-xl border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30"
              />
              {errors.phone_number && (
                <p className="mt-1.5 text-xs text-red-300">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {serverError && (
              <div className="rounded-lg border-red-400/30 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-200">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-linear-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-400/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال لینک بازیابی"}
            </button>

            <div className="flex justify-center text-white font-light">
              <Link href={"/login"}>بازگشت به صفحه ورود</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
