import { z } from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .max(11, { error: "شماره تماس ۱۱ رقمی میباشد" })
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  password: z.string().min(6, { error: "رمز عبور حداقل ۶ کاراکتر هست" }),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    phone_number: z
      .string()
      .min(1, "شماره تلفن الزامی است")
      .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirm_password: z.string().min(1, "تکرار رمز عبور الزامی است"),
    melli_code: z.string().min(1, "کد ملی الزامی است"),
    first_name: z.string(),
    last_name: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "عدم تطابق رمز عبور",
    path: ["confirm_password"],
  });

export const requestOtp = z.object({
  phone_number: z
    .string()
    .max(11, "شماره تلفن یازده رقمی است")
    .regex(
      /^09\d{9}$/,
      "شماره موبایل معتبر نیست و شماره تلفن یازده رقمی و با ۰۹ شروع میشود"
    ),
});

export const verifyOtp = z.object({
  code: z
    .string()
    .min(1, "کد تایید الزامی است")
    .regex(/^\d{5,6}$/, "کد تایید معتبر نیست"),
});

export const jwtToken = z.object({
  token: z.string().min(256).max(512),
});

export const forgetPassword = z.object({
  phone_number: z
    .string()
    .min(11, "شماره تلفن یازده رقمی باید باشد")
    .regex(
      /^09\d{9}$/,
      "شماره موبایل معتبر نیست و شماره تلفن یازده رقمی و با ۰۹ شروع میشود"
    ),
});

export type ForgetPasswordValue = z.infer<typeof forgetPassword>;
export type JwtToken = z.infer<typeof jwtToken>;
export type VerifyOtpValue = z.infer<typeof verifyOtp>;
export type RequestOtpValue = z.infer<typeof requestOtp>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
