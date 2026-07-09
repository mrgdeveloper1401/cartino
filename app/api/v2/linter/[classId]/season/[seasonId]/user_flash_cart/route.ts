import { V2_BASE_URL, isDev, response } from "@/utils/config";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ classId: string; seasonId: string }> }
) {
  try {
    const { classId, seasonId } = await params;

    const token = req.headers.get("Authorization");
    if (!token) {
      return response.json(
        {
          success: false,
          message: "Unauthorized",
          detail: "اطلاعات اعتبار سنجی ارسال نشده است",
        },
        { status: 401 }
      );
    }

    // ✅ گرفتن همه query params
    const box = req.nextUrl.searchParams.get("box");
    const page = req.nextUrl.searchParams.get("page");

    // ✅ ساخت query string
    const queryParams = new URLSearchParams();
    if (box) queryParams.append("box", box);
    if (page) queryParams.append("page", page);

    const queryString = queryParams.toString()
      ? `?${queryParams.toString()}`
      : "";

    const prodReqUrl = `${V2_BASE_URL}/linter/class_purchase/${classId}/season/${seasonId}/user_flash_cart/${queryString}`;
    const devReqUrl = `http://localhost:8000/v2/linter/class_purchase/${classId}/season/${seasonId}/user_flash_cart/${queryString}`;
    const reqUrl = isDev ? devReqUrl : prodReqUrl;

    const upstream = await fetch(reqUrl, {
      headers: { "content-type": "application/json", Authorization: token },
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return response.json(
        { success: false, message: "خطا", detail: data?.detail || "خطا" },
        { status: upstream.status }
      );
    }

    return response.json({ success: true, data });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        detail: (error as Error)?.message || "خطا",
      },
      { status: 500 }
    );
  }
}
