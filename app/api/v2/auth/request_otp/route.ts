import { requestOtp } from "@/lib/validations/auth";
import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const prodReqUrl = `${V2_BASE_URL}/auth/request_otp/`;
const devReqUrl = "http://localhost:8000/v2/auth/request_otp/";
const reqUrl = isDev ? devReqUrl : prodReqUrl;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json(
        {
          success: false,
          message: "fields in request body is required",
        },
        {
          status: 400,
        }
      );
    }

    // validate request body
    const validationResult = requestOtp.safeParse(body);
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

    const upstream = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseData = await upstream.json();
    if (!upstream.ok) {
      return response.json(
        {
          success: false,
          message: "خطا",
          detail: responseData.detail || "خطا",
        },
        {
          status: upstream.status,
        }
      );
    }

    // success
    const cookieStore = await cookies();
    cookieStore.set("otp_phone", responseData.phone_number, {
      maxAge: 120,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response.json({
      success: true,
    });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        detail: (error as Error).message || "خطا",
      },
      {
        status: 500,
      }
    );
  }
}
