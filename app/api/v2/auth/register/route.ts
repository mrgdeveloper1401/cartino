import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { V2_BASE_URL, response } from "@/utils/config";
import { registerSchema } from "@/lib/validations/auth";

const REQ_URL = `${V2_BASE_URL}/auth/register/`;

export async function POST(req: NextRequest) {
  try {
    // body is phone_number, password, confirm_password, melli_code, first_name, last_name
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

    // validate request body
    const validationResult = await registerSchema.safeParseAsync(body);
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

    // The data has been validated.
    // const validateData = validationResult.data;

    const upstream = await fetch(REQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseData = await upstream.json();
    if (!upstream.ok) {
      return response.json(
        {
          success: false,
          message: responseData.message || "خطا در ثبت نام",
          error: responseData.errors || responseData,
        },
        {
          status: upstream.status,
        }
      );
    }

    // success
    const cookieStore = await cookies();
    cookieStore.set("token", responseData.token.access, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: responseData.token.access_token_life_time,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response.json(
      {
        success: true,
        data: responseData,
      },
      {
        status: upstream.status,
      }
    );
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
