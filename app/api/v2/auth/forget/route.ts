import { forgetPassword } from "@/lib/validations/auth";
import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { NextRequest } from "next/server";

const prodReqUrl = `${V2_BASE_URL}/auth/request_forget_password/`;
const devReqUrl = 'http://localhost:8000/v2/auth/request_forget_password/'
const reqUrl = isDev ? devReqUrl : prodReqUrl;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json(
        {
          success: false,
          message: "request_body",
          detail: "request body is required",
        },
        { status: 400 }
      );
    }

    const validateData = forgetPassword.safeParse(body);
    if (!validateData.success) {
      return response.json(
        {
          success: false,
          message: "validation error",
          detail: validateData.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    const reqBody = {
      phone_number: validateData.data.phone_number,
    };
    const upstream = await fetch(reqUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      return response.json(
        {
          success: false,
          message: data?.message || "خطا",
          detail: data?.detail || "خطا",
        },
        {
          status: upstream.status,
        }
      );
    }

    return response.json({
      success: true,
    });

  } catch (error) {
    return response.json({
      success: false,
      message: "خطای سرور",
      detail: (error as Error)?.message || "خطای سرور",
    });
  }
}
