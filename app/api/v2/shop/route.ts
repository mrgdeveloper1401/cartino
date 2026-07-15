//app/api/v2/shop/route.ts
import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { NextRequest } from "next/server";

const prodReqUrl = `${V2_BASE_URL}/linter/linter_class/`;
const devReqUrl = "http://localhost:8000/v2/linter/linter_class/";
const reqUrl = isDev ? devReqUrl : prodReqUrl;

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

    const upstream = await fetch(reqUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': token,
      },
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
        detail: (error as Error).message || "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
