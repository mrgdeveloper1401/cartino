import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { loginSchema } from "@/lib/validations/auth";

const prodReqUrl = `${V2_BASE_URL}/auth/login_by_phone_password/`;
const devReqUrl = "http://localhost:8000/v2/auth/login_by_phone_password/";
const reqUrl = isDev ? devReqUrl : prodReqUrl;

export async function POST(req: NextRequest) {
  try {
    // check body
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json(
        {
          success: false,
          detail: "request body is required",
          message: "field_required",
        },
        {
          status: 400,
        }
      );
    }

    // validate data
    const validateData = loginSchema.parse(body);

    // request url backend
    const upstream = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validateData),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return response.json(
        { message: data?.detail ?? "ورود ناموفق بود" },
        { status: upstream.status }
      );
    }

    // set token into cookie
    const cookieStore = await cookies();
    cookieStore.set("token", data.token.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.token.access_token_life_time,
    });

    // response data
    return response.json({ success: true });
  } catch (error) {
    return response.json(
      {
        success: false,
        messsage: "خطای سرور",
        detail: (error as Error)?.message || "",
      },
      {
        status: 500,
      }
    );
  }
}
