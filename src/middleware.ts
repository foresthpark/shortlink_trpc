import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname?.startsWith("/api/get-url")) {
    return;
  }

  const slug = req.nextUrl.pathname?.split("/").pop();

  if (slug) {
    const data = await (
      await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
    ).json();

    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    if (!data?.url) return;
  }

  return;
}

export const config = {
  matcher: "/:path*",
};
