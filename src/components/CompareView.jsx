"use client";
import Link from "next/link";
import { useData } from "./DataProvider";
import { formatPrice, toBn } from "@/lib/format";

export default function CompareView() {
  const { products, loading } = useData();
  return (
    <div className="container-bz space-y-4 py-6">
      <header className="card-bz p-5">
        <h1 className="text-2xl font-bold">⚖️ বাজার তুলনা</h1>
        <p className="text-sm text-base-content/70">
          {loading ? "লোড হচ্ছে…" : `${toBn(products.length)}টি পণ্যের সর্বনিম্ন, সর্বাধিক ও গড় দাম`}
        </p>
      </header>
      {loading ? (
        <div className="skeleton h-80 w-full rounded-2xl" />
      ) : (
        <div className="card-bz overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-base-300">
                {["পণ্য", "একক", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id + p.slug} className={`border-b border-base-300 last:border-0 ${i % 2 === 1 ? "bg-base-200" : ""}`}>
                  <td className="px-4 py-3 font-medium">
                    <Link href={`/product/${encodeURIComponent(p.slug)}`} className="hover:text-primary">
                      {p.emoji} {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-base-content/70">{p.unit}</td>
                  <td className="px-4 py-3">{formatPrice(p.min)}</td>
                  <td className="px-4 py-3">{formatPrice(p.max)}</td>
                  <td className="px-4 py-3 font-semibold">{formatPrice(p.avg)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
