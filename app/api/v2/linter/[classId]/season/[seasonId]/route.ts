import { V2_BASE_URL, response } from "@/utils/config";
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
        {
          status: 401,
        }
      );
    }

    const REQ_URL = `${V2_BASE_URL}/linter/class_purchase/${classId}/season/${seasonId}`;

    const upstream = await fetch(REQ_URL, {
      headers: {
        "content-type": "application/json",
        'Authorization': token,
      },
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      return response.json(
        {
          success: false,
          message: "خطا",
          detail: data?.detail || "خطا",
        },
        {
          status: upstream.status,
        }
      );
    }

    return response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        detail: (error as Error)?.message || "خطای سرور",
      },
      {
        status: 500,
      }
    );
  }
}
