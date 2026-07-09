import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { verifyOtp } from "@/lib/validations/auth";

const prodReqUrl = `${V2_BASE_URL}/auth/verify_otp/`;
const devReqUrl = "http://localhost:8000/v2/auth/verify_otp/";
const reqUrl = isDev ? devReqUrl : prodReqUrl;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json(
        {
          message: "fields in request body is required",
        },
        {
          status: 400,
        }
      );
    }

    const cookieStore = await cookies();
    const phone = cookieStore.get("otp_phone")?.value;

    if (!phone) {
      return response.json(
        { message: "شماره موبایل یافت نشد. دوباره کد را درخواست کنید" },
        { status: 400 }
      );
    }

    // validate request body
    const validationResult = await verifyOtp.safeParseAsync(body);
    if (!validationResult.success) {
      const error = validationResult.error.issues;

      return response.json(
        {
          success: false,
          message: "خطا در اعتبار سنجی",
          error: error,
        },
        {
          status: 400,
        }
      );
    }

    const newBody = {
      phone_number: phone,
      code: validationResult.data.code,
    };

    const upstream = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBody),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return response.json(
        { message: data?.detail ?? "کد تایید اشتباه است" },
        { status: upstream.status }
      );
    }

    cookieStore.set("token", data.token.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.token.access_token_life_time,
    });

    cookieStore.delete("otp_phone");

    return response.json({ ok: true });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        detail: (error as Error).message || "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
