"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
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

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "", rememberMe: false },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const req = await fetch("/api/v2/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: data.phone,
          password: data.password,
        }),
      });
      if (!req.ok) {
        form.setError("password", {
          message: req.status === 404 ? "نام کاربری یا رمز عبور اشتباه هست": 'خطا در ورود'
        });
      } else {
        router.replace("/");
      }
    } catch (err) {
      form.setError("password", {
        message: axios.isAxiosError(err)
          ? err.response?.data?.message ?? "خطا در ورود"
          : "خطا در ورود",
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

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300 text-sm">
              Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="شماره تلفن"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="رمز عبور"
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              {/*<div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-x-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-white/30"
                        />
                      </FormControl>
                      <FormLabel className="text-white text-sm font-normal cursor-pointer">
                        مرا به خاطر بسپار
                      </FormLabel>
                    </FormItem>
                  )}
                />
                {/* <button
                onClick={() => router.replace('/forget')}
                  className="text-sm text-purple-300 hover:text-purple-200 transition"
                >
                  رمز عبور را فراموش کردید؟
                </button> */}
              {/* </div>  */}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "در حال ورود..." : "ورود"}
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300 text-sm">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-purple-300 hover:text-purple-200 font-semibold"
              >
                ثبت نام
              </Link>
            </p>
            <p className="text-gray-300 text-sm mt-2">
              <Link
                href="/otp"
                className="text-purple-300 hover:text-purple-200 font-semibold"
              >
                {" "}
                ورود با کد تایید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
