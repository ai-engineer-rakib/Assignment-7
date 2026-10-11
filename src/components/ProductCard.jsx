import Link from "next/link";
import { formatChange, formatNum } from "@/lib/format";

export function ChangeBadge({ change, className = "" }) {
  const cls =
    change > 0
      ? "bg-success/10 text-success"
      : change < 0
      ? "bg-error/10 text-error"
      : "bg-base-200 text-base-content/60";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${cls} ${className}`}>
      {formatChange(change)}
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="card-bz block p-5 transition hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{product.name}</h3>
          <p className="text-xs text-base-content/60">{product.unit}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">
            {formatNum(product.price)} <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
