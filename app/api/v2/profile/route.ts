// app/api/v1/profile
import { V2_BASE_URL, response } from "@/utils/config";
import { NextRequest } from "next/server";

const REQ_URL = `${V2_BASE_URL}/auth/profile/`;

export async function GET(req: NextRequest) {
  try {
    // check login
    const token = req.headers.get("Authorization");
    
    if (!token) {
      return response.json(
        {
          success: false,
          message: "خطای اعتبار سنجی",
        },
        {
          status: 401,
        }
      );
    }

    // request profile
    const res = await fetch(REQ_URL, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': token,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return response.json(
        {
          success: false,
          message: "خطا در پروفایل",
          detail: data?.detail ?? "خطای پروفایل",
        },
        {
          status: res.status,
        }
      );
    }

    // return data
    return response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "خطای سرور",
        error: error,
      },
      { status: 500 }
    );
  }
}
