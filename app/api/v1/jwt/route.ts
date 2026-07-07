import { jwtToken } from "@/lib/validations/auth";
import { PROD_JWT_URL, response } from "@/utils/config";
import { NextRequest } from "next/server";

const REQ_URL = PROD_JWT_URL

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return response.json({
        success: false,
        message: "request body",
        detail: "request body is required",
      });
    }

    // validate
    const validateData = jwtToken.safeParse(body);
    if (!validateData.success) {
      return response.json(
        {
          success: false,
          message: "خطای اعتبار سنجی",
          detail: validateData.error.issues,
        },
        {
          status: 400,
        }
      );
    }

    // request backend
    const upstraem = await fetch(REQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await upstraem.json();
    if (!upstraem.ok) {
      return response.json(
        {
          success: false,
          message: "invalid_token",
          detail: data?.detail || "توکن نامعتبر هست",
        },
        { status: 401 }
      );
    }

    // success token
    return response.json({
      success: true,
    });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        detail: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
