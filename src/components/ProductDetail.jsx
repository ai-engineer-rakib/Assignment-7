"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { normalizeProduct, unwrapList, unwrapOne } from "@/lib/normalize";
import { useData } from "./DataProvider";
import { ChangeBadge } from "./ProductCard";
import EmptyState from "./EmptyState";
import { changeAmount, formatChange, formatNum, formatPrice, toBn } from "@/lib/format";

function DetailSkeleton() {
  return (
    <div className="container-bz space-y-4 py-6">
      <div className="skeleton h-5 w-48" />
      <div className="skeleton h-36 w-full rounded-2xl" />
      <div className="skeleton h-72 w-full rounded-2xl" />
    </div>
  );
}

export default function ProductDetail({ slug }) {
  const { categories } = useData();
  const [state, setState] = useState({ loading: true, product: null });

  useEffect(() => {
    let alive = true;
    (async () => {
      let product = null;
      try {
        const one = unwrapOne(await apiGet(`/products/${encodeURIComponent(slug)}`));
        if (one && typeof one === "object") product = normalizeProduct(one);
      } catch {}
      if (!product) {
        try {
          const list = unwrapList(await apiGet("/products")).map(normalizeProduct);
          product = list.find((p) => p.slug === slug || p.id === slug) || null;
        } catch {}
      }
      if (alive) setState({ loading: false, product });
    })();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (state.loading) return <DetailSkeleton />;

  const p = state.product;
  if (!p) {
    return (
      <div className="container-bz py-12">
        <EmptyState title="পণ্যটি পাওয়া যায়নি" message="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।" />
      </div>
    );
  }

  const cat = categories.find((c) => c.slug === p.categorySlug);
  const catName = p.categoryName || cat?.name || p.tags?.[0] || "";
  const unitShort = p.unit.replace("প্রতি ", "");
  const amount = Number.isFinite(p.prev) ? Math.abs(p.price - p.prev) : changeAmount(p.price, p.change);

  const markets = p.markets || [];
  const lowest = markets.length ? markets.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const highest = markets.length ? markets.reduce((a, b) => (b.max > a.max ? b : a)) : null;

  const stats = [
    { label: "সর্বনিম্ন দাম", value: p.min, cap: lowest ? lowest.name : "সবচেয়ে কম দামের বাজার" },
    { label: "সর্বাধিক দাম", value: p.max, cap: highest ? highest.name : "সবচেয়ে বেশি দামের বাজার" },
    { label: "গড় দাম", value: p.avg, cap: `${p.unit}-এর হিসাবে` },
  ];

  return (
    <div className="container-bz space-y-4 py-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-base-content/70" aria-label="breadcrumb">
        <Link href="/" className="hover:text-primary">হোম</Link>
        {catName && (
          <>
            <span>›</span>
            {p.categorySlug ? (
              <Link href={`/category/${encodeURIComponent(p.categorySlug)}`} className="hover:text-primary">
                {catName}
              </Link>
            ) : (
              <span>{catName}</span>
            )}
          </>
        )}
        <span>›</span>
        <span className="font-medium text-base-content">{p.name}</span>
      </nav>

      <header className="card-bz p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {p.emoji}
          </span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{p.name}</h1>
            <p className="text-sm text-base-content/70">
              {p.unit}
              {catName ? ` · ${catName}` : ""}
            </p>
            {p.description && <p className="mt-1 text-sm text-base-content/70">{p.description}</p>}
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম{" "}
              {p.change > 0 ? (
                <b className="text-success">বেড়েছে</b>
              ) : p.change < 0 ? (
                <b className="text-error">কমেছে</b>
              ) : (
                <b>অপরিবর্তিত</b>
              )}
              {p.change !== 0 ? <> · {toBn(amount)} টাকা</> : null}
            </p>
          </div>
          <div className="rounded-2xl bg-base-200 px-6 py-4 text-center sm:min-w-[130px]">
            <p className="text-sm text-base-content/70">আজকের দাম</p>
            <p className="text-4xl font-bold leading-tight">{formatNum(p.price)}</p>
            <p className="text-sm text-base-content/70">টাকা / {unitShort}</p>
            <p
              className={`mt-1 text-sm font-semibold ${
                p.change > 0 ? "text-success" : p.change < 0 ? "text-error" : "text-base-content/60"
              }`}
            >
              {formatChange(p.change)}
            </p>
          </div>
        </div>
      </header>

      <section className="card-bz space-y-8 p-5 sm:p-6">
        <div>
          <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="card-bz p-4">
                <p className="text-sm text-base-content/70">{s.label}</p>
                <p className="mt-1 text-2xl font-bold">{formatPrice(s.value)}</p>
                <p className="text-xs text-base-content/60">{s.cap}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
          {markets.length ? (
            <div className="card-bz overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-base-300">
                    {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => (
                    <tr key={i} className={`border-b border-base-300 last:border-0 ${i % 2 === 1 ? "bg-base-200" : ""}`}>
                      <td className="px-4 py-3 font-medium">{m.name}</td>
                      <td className="px-4 py-3 text-base-content/70">{m.area || "—"}</td>
                      <td className="px-4 py-3">{formatPrice(m.min)}</td>
                      <td className="px-4 py-3">{formatPrice(m.max)}</td>
                      <td className="px-4 py-3 font-semibold">{formatPrice(m.avg)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-xl bg-base-200 p-4 text-sm text-base-content/70">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
          )}
        </div>
      </section>

      <div>
        <Link href={p.categorySlug ? `/category/${encodeURIComponent(p.categorySlug)}` : "/"} className="btn btn-outline btn-sm h-10 min-h-0 border-base-content text-base-content hover:bg-base-200 hover:text-base-content">
          ← পেছনে যান
        </Link>
      </div>
    </div>
  );
}
