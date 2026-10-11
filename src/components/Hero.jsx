"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useData } from "./DataProvider";
import { toBn } from "@/lib/format";

export default function Hero() {
  const { products, categories, loading } = useData();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    );
  }, []);

  const marketCount = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.markets.forEach((m) => set.add(m.name)));
    return set.size || 12;
  }, [products]);

  const stats = [
    { label: "পণ্য", value: products.length, cap: "টি নিত্যদিনের পণ্য" },
    { label: "বাজার", value: marketCount, cap: "টি বাজার অন্তর্ভুক্ত" },
    { label: "বিভাগ", value: categories.length, cap: "টি বিভাগের তথ্য" },
  ];

  return (
    <section className="container-bz pt-6">
      <div className="card-bz overflow-hidden rounded-3xl p-6 sm:p-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="inline-flex min-h-[28px] items-center rounded-full bg-primary px-3 text-sm font-medium text-primary-content">
              {date || "\u00A0"}
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
            <p className="mt-3 max-w-xl text-base text-base-content/70">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের
              পরিবর্তন এক জায়গায়।
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#সব-পণ্য" className="btn btn-primary btn-sm h-10 min-h-0 px-5 sm:btn-md">
                সব পণ্য দেখুন
              </a>
              <Link
                href="/compare"
                className="btn btn-outline btn-sm h-10 min-h-0 border-base-content px-5 text-base-content hover:bg-base-200 hover:text-base-content sm:btn-md"
              >
                ⚖️ বাজার তুলনা
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Image
              src="/bazar-hero.png"
              alt="তাজা বাজারের ঝুড়ি"
              width={315}
              height={263}
              priority
              className="h-auto w-full max-w-[240px]"
            />
            <div className="grid w-full grid-cols-3 divide-x divide-base-300 overflow-hidden rounded-2xl border border-base-300 bg-base-200">
              {stats.map((s) => (
                <div key={s.label} className="px-2 py-3 text-center">
                  <p className="text-xs text-base-content/70">{s.label}</p>
                  {loading ? (
                    <div className="skeleton mx-auto my-1 h-8 w-10" />
                  ) : (
                    <p className="text-3xl font-bold leading-tight text-primary">{toBn(s.value)}</p>
                  )}
                  <p className="text-[11px] leading-tight text-base-content/70">{s.cap}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
