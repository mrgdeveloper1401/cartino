import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PROD_JWT_URL, isDev } from "./utils/config";

const devReqUrl = "http://localhost:8000/api/jwt/verify/";
const prodReqUrl = PROD_JWT_URL;
const reqUrl = isDev ? devReqUrl : prodReqUrl;

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { pathname } = request.nextUrl;

  const requestPath = [
    "/",
    "/profile",
    "/shop",
    "/flashcards",
    "/flashcards/:path*",
  ];
  if (!token && requestPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    // check in backend
    const reqBody = {
      token: token,
    };
    const response = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(reqBody),
    });
    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/shop", "/flashcards", "/flashcards/:path*"],
};
