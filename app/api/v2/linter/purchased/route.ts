// app/api/linter/purchased/route.ts
import { NextRequest } from "next/server";
import { V2_BASE_URL, isDev, response } from "@/utils/config";

const prodReqUrl = `${V2_BASE_URL}/linter/class_purchase/`;
const devRequrl = "http://localhost:8000/v2/linter/class_purchase/";
const reqUrl = isDev ? devRequrl : prodReqUrl;

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization");

  if (!token) {
    return response.json(
      { success: false, detail: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const responseData = await fetch(reqUrl, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!responseData.ok) {
      return response.json(
        { success: false, detail: "Failed to fetch data" },
        { status: responseData.status }
      );
    }

    const data = await responseData.json();
    return response.json(data);
  } catch (error) {
    return response.json(
      {
        success: false,
        message: "Internal server error",
        detail: (error as Error).message || "خطای سرور",
      },
      { status: 500 }
    );
  }
}
