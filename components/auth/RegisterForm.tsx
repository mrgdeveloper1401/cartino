"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone_number: "",
      melli_code: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      await axios.post("/api/v2/auth/register", data);
      router.push("/");
      router.refresh();
    } catch (err) {
      form.setError("confirm_password", {
        message: axios.isAxiosError(err)
          ? err.response?.data?.message ?? "خطا در ثبت‌نام"
          : "خطا در ثبت‌نام",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Background shapes for glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      {/* Register Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-300 text-sm">
              Please fill in the details to register
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">شماره موبایل</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="09123456789"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Melli Code */}
              <FormField
                control={form.control}
                name="melli_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">کد ملی</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        maxLength={10}
                        placeholder="1234567890"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* First Name & Last Name - Two columns */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">نام</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="نام"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">نام خانوادگی</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="نام خانوادگی"
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="حداقل 8 کاراکتر"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">تکرار رمز عبور</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="تکرار رمز عبور"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "در حال ثبت‌نام..." : "ثبت نام"}
              </Button>
            </form>
          </Form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              قبلاً ثبت‌نام کرده‌اید؟{" "}
              <Link
                href="/login"
                className="text-purple-300 hover:text-purple-200 font-semibold"
              >
                ورود
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
