//app/api/v2/shop/route.ts
import { V2_BASE_URL, response } from "@/utils/config";
import { NextRequest } from "next/server";

const REQ_URL = `${V2_BASE_URL}/linter/linter_class`;

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return response.json(
        {
          succcess: false,
          message: "خطای اعتبارسنجی",
          detail: "اطلاعات اعتبار سنجی درون هدر ها موجود نیست",
        },
        {
          status: 401,
        }
      );
    }

    const upstream = await fetch(REQ_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });
    const data = await upstream.json();

    if (!upstream.ok) {
      return response.json(
        {
          success: false,
          message: data?.message ?? "خطا",
          detail: data?.detail ?? "خطا در دریافت داده",
        },
        {
          status: upstream.status,
        }
      );
    }

    // return data
    return response.json(data, {
      status: 200,
    });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
