import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASES = [
  process.env.BAZAR_API_1 || "https://openapi.programming-hero.com/api/bazardor",
  process.env.BAZAR_API_2 || "http://openapi.programming-hero.com/api/bazardor",
];

export async function GET(request, { params }) {
  const path = (params.path || []).map(encodeURIComponent).join("/");
  const search = request.nextUrl.search || "";
  let lastStatus = 502;

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}/${path}${search}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (res.status === 404) {
        lastStatus = 404;
        continue;
      }
      if (!res.ok) {
        lastStatus = res.status;
        continue;
      }
      const data = await res.json();
      return NextResponse.json(data);
    } catch {
      lastStatus = 502;
    }
  }
  return NextResponse.json({ error: "Not found or API unavailable" }, { status: lastStatus });
}
