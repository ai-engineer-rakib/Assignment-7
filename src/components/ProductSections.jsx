"use client";
import { useMemo, useState } from "react";
import { useData } from "./DataProvider";
import ProductCard from "./ProductCard";
import { GridSkeleton } from "./Skeletons";
import SortSelect from "./SortSelect";
import { sortProducts, toBn } from "@/lib/format";

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

function Heading({ icon, iconCls, children }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
      {icon && <span className={`text-base ${iconCls}`}>{icon}</span>}
      {children}
    </h2>
  );
}

export default function ProductSections() {
  const { products, loading, error } = useData();
  const [sort, setSort] = useState("default");

  const risers = useMemo(
    () => [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6),
    [products]
  );
  const fallers = useMemo(
    () => [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6),
    [products]
  );
  const all = useMemo(() => sortProducts(products, sort), [products, sort]);

  if (loading) {
    return (
      <div className="container-bz space-y-8 py-6">
        <section>
          <Heading icon="▲" iconCls="text-success">আজ দাম বেড়েছে</Heading>
          <GridSkeleton count={3} />
        </section>
        <section>
          <Heading icon="▼" iconCls="text-error">আজ দাম কমেছে</Heading>
          <GridSkeleton count={3} />
        </section>
        <section id="সব-পণ্য" className="scroll-mt-4">
          <Heading>সব পণ্য</Heading>
          <GridSkeleton count={9} />
        </section>
      </div>
    );
  }

  if (error || !products.length) {
    return (
      <div className="container-bz py-12 text-center">
        <p className="text-lg font-semibold">ডেটা লোড করা যায়নি</p>
        <p className="mt-1 text-sm text-base-content/70">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
        <button className="btn btn-primary mt-4" onClick={() => window.location.reload()}>
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  return (
    <div className="container-bz space-y-8 py-6">
      <section>
        <Heading icon="▲" iconCls="text-success">আজ দাম বেড়েছে</Heading>
        {risers.length ? (
          <div className={grid}>
            {risers.map((p) => (
              <ProductCard key={`r-${p.id}-${p.slug}`} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/60">আজ কোনো পণ্যের দাম বাড়েনি।</p>
        )}
      </section>

      <section>
        <Heading icon="▼" iconCls="text-error">আজ দাম কমেছে</Heading>
        {fallers.length ? (
          <div className={grid}>
            {fallers.map((p) => (
              <ProductCard key={`f-${p.id}-${p.slug}`} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-base-content/60">আজ কোনো পণ্যের দাম কমেনি।</p>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-4">
        <Heading>সব পণ্য</Heading>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-base-content/70">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
          <SortSelect value={sort} onChange={setSort} />
        </div>
        <div className={grid}>
          {all.map((p) => (
            <ProductCard key={`a-${p.id}-${p.slug}`} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
