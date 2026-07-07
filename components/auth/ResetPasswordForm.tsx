"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const resetPasswordSchema = z.object({
  otp: z.string().length(6, "کد تایید باید ۶ رقم باشد"),
  new_password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر"),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "رمز عبور و تکرار آن مطابقت ندارند",
  path: ["confirm_password"],
});

type ResetPasswordValue = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");
  
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValue>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { otp: "", new_password: "", confirm_password: "" },
  });

  async function onSubmit(data: ResetPasswordValue) {
    setServerError(null);
    
    if (!phone) {
      setServerError("شماره موبایل یافت نشد");
      return;
    }

    try {
      const res = await fetch("/api/v2/auth/reset_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phone,
          otp: data.otp,
          new_password: data.new_password,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setServerError(result.message || "خطا در تغییر رمز عبور");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.replace("/login"), 2000);
    } catch {
      setServerError("خطای ارتباط با سرور");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="absolute -top-24 -left-24 h-72 w-72 animate-pulse rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 animate-pulse rounded-full bg-purple-500/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">تنظیم رمز عبور جدید</h1>
          <p className="mt-2 text-sm text-white/60">
            کد تایید و رمز عبور جدید خود را وارد کنید
          </p>
          {phone && (
            <p className="mt-1 text-xs text-white/40">{phone}</p>
          )}
        </div>

        {success ? (
          <div className="rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-200">
            رمز عبور با موفقیت تغییر کرد. در حال انتقال به صفحه ورود...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir="rtl">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                کد تایید
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="۶ رقم"
                {...register("otp")}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center text-white placeholder-white/40 outline-none transition focus:border-blue-400/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30"
              />
              {errors.otp && (
                <p className="mt-1.5 text-xs text-red-300">{errors.otp.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="new_password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                رمز عبور جدید
              </label>
              <input
                id="new_password"
                type="password"
                placeholder="حداقل ۸ کاراکتر"
                autoComplete="new-password"
                {...register("new_password")}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30"
              />
              {errors.new_password && (
                <p className="mt-1.5 text-xs text-red-300">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="mb-2 block text-sm font-medium text-white/80"
              >
                تکرار رمز عبور
              </label>
              <input
                id="confirm_password"
                type="password"
                placeholder="رمز عبور را دوباره وارد کنید"
                autoComplete="new-password"
                {...register("confirm_password")}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-blue-400/60 focus:bg-white/10 focus:ring-2 focus:ring-blue-400/30"
              />
              {errors.confirm_password && (
                <p className="mt-1.5 text-xs text-red-300">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            {serverError && (
              <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-200">
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-linear-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-lg transition hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-400/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "در حال تغییر..." : "تغییر رمز عبور"}
            </button>

            <div className="flex justify-center text-sm text-white/60">
              <Link href="/login" className="hover:text-white transition">
                بازگشت به صفحه ورود
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
