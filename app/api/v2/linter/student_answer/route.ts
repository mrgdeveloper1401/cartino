// api/v2/linter/student_answer

import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const prodReqUrl = `${V2_BASE_URL}/linter/student_answer`;
const devRequrl = "http://localhost:8000/v2/linter/student_answer";
const reqUrl = isDev ? devRequrl : prodReqUrl;

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return response.json(
        {
          success: false,
          message: "Authorization",
          detail: "Authorization Error",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json(
        {
          success: false,
          mssage: "field error",
          detail: "request body field flash_cart_id and is_correct is required",
        },
        {
          status: 400,
        }
      );
    }
    const upstream = await fetch(reqUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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

    return response.json(
      {
        success: true,
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
        error: (error as Error).message || "خطا",
      },
      {
        status: 500,
      }
    );
  }
}
