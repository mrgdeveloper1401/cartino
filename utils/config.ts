import { NextResponse } from "next/server";

// utils/config.ts
export const V2_BASE_URL =
  process.env.NEXT_PUBLIC_V2_BASE_URL ||
  process.env.V2_BASE_URL ||
  "https://api.cartinoapp.ir/v2";

export const V1_BASE_URL =
  process.env.NEXT_PUBLIC_V1_BASE_URL ||
  process.env.V1_BASE_URL ||
  "https://api.cartinoapp.ir/v1";

export const PROD_JWT_URL =
  process.env.PROD_JWT_URL || "https://api.cartinoapp.ir/api/jwt/verify/";
export const APP_URL = process.env.APP_URL || "https://www.cartinoapp.ir";
export const isDev = process.env.NODE_ENV === "development";
// export const isDev = false;
export const response = NextResponse;
