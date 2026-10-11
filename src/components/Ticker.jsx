"use client";
import { useData } from "./DataProvider";
import { formatChange, formatNum } from "@/lib/format";

export default function Ticker() {
  const { products, loading } = useData();

  if (loading) {
    return (
      <div className="border-b border-base-300 bg-base-100 py-2">
        <div className="container-bz">
          <div className="skeleton h-5 w-full" />
        </div>
      </div>
    );
  }
  if (!products.length) return null;

  const items = products.map((p) => (
    <span
      key={p.id + p.slug}
      className="inline-flex items-center gap-2 whitespace-nowrap border-r border-base-300 px-4 py-2 text-sm"
    >
      <span>{p.emoji}</span>
      <span>{p.name}</span>
      <span className="text-base-content/70">
        {formatNum(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
      </span>
      <span className={`font-semibold ${p.change > 0 ? "text-success" : p.change < 0 ? "text-error" : "text-base-content/50"}`}>
        {formatChange(p.change).replace("—০.০%", "— ০.০%")}
      </span>
    </span>
  ));

  return (
    <div className="marquee-wrap overflow-hidden border-b border-base-300 bg-base-100">
      <div className="flex w-max animate-marquee">
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
