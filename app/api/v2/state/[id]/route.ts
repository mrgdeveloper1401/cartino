import { response } from "@/utils/config";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const reqUrl = `https://api.gs-tools.ir/v1/auth/state/${id}`;
    const upstream = await fetch(reqUrl, {
      headers: { "content-type": "application/json" },
    });
    const data = await upstream.json();
    return response.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return response.json({
      success: false,
      message: "خطای سرور",
      detail: (error as Error)?.message || "خطای سرور",
    });
  }
}
