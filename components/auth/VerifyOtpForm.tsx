"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyOtp, VerifyOtpValue } from "@/lib/validations/auth";

interface VerifyOtpFormProps {
  otp_phone: string | undefined;
}

export function VerifyOtpForm({ otp_phone }: VerifyOtpFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpValue>({
    resolver: zodResolver(verifyOtp),
    defaultValues: { code: "" },
  });

  async function onSubmit(data: VerifyOtpValue) {
    setServerError(null);
    try {
      //   const cookieStore = await cookies();
      //   const otp_phone = cookieStore.get("otp_phone");
      const newData = {
        phone_number: otp_phone,
        code: data.code,
      };

      const res = await fetch("/api/v2/auth/verify_otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (!res.ok || !result.ok) {
        setServerError(result.message || "خطا در تایید کد");
        return;
      }

      // redirect
      router.replace("/");
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
          <h1 className="text-2xl font-bold text-white">تایید کد</h1>
          <p className="mt-2 text-sm text-white/60">
            کد ارسال‌شده به شماره موبایل خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir="rtl">
          <div>
            <label
              htmlFor="code"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              کد تاید
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="- - - - - -"
              {...register("code")}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center tracking-[0.5em] text-white placeholder-white/40 outline-none transition focus:border-blue-400/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30"
            />
            {errors.code && (
              <p className="mt-1.5 text-xs text-red-300">
                {errors.code.message}
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
            {isSubmitting ? "در حال بررسی..." : "تایید و ورود"}
          </button>

          <div className="flex justify-center text-white font-light">
            <button
              type="button"
              disabled={!canResend}
              onClick={() => router.replace("/otp")}
              className={`font-light transition ${
                canResend
                  ? "text-white hover:underline cursor-pointer"
                  : "text-white/30 cursor-not-allowed"
              }`}
            >
              ارسال مجدد کد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
