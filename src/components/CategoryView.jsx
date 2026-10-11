"use client";
import { useEffect, useMemo, useState } from "react";
import { apiGet } from "@/lib/api";
import { normalizeCategory, normalizeProduct, unwrapList, unwrapOne } from "@/lib/normalize";
import { useData } from "./DataProvider";
import ProductCard from "./ProductCard";
import { GridSkeleton } from "./Skeletons";
import SortSelect from "./SortSelect";
import EmptyState from "./EmptyState";
import { sortProducts, toBn } from "@/lib/format";

export default function CategoryView({ slug }) {
  const { categories } = useData();
  const [state, setState] = useState({ loading: true, items: [], category: null });
  const [sort, setSort] = useState("default");

  useEffect(() => {
    let alive = true;
    setState({ loading: true, items: [], category: null });
    Promise.allSettled([
      apiGet(`/products?category=${encodeURIComponent(slug)}`),
      apiGet(`/categories/${encodeURIComponent(slug)}`),
    ]).then(([p, c]) => {
      if (!alive) return;
      setState({
        loading: false,
        items: p.status === "fulfilled" ? unwrapList(p.value).map(normalizeProduct) : [],
        category: c.status === "fulfilled" ? normalizeCategory(unwrapOne(c.value)) : null,
      });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  const fromList = categories.find((c) => c.slug === slug);
  const cat = state.category || fromList;
  const sorted = useMemo(() => sortProducts(state.items, sort), [state.items, sort]);

  if (state.loading) {
    return (
      <div className="container-bz space-y-4 py-6">
        <div className="skeleton h-24 w-full rounded-2xl" />
        <div className="skeleton h-16 w-full rounded-2xl" />
        <GridSkeleton count={6} />
      </div>
    );
  }

  if (!state.items.length) {
    return (
      <div className="container-bz py-12">
        <EmptyState title="এই ক্যাটেগরিতে কোনো পণ্য নেই" message="ক্যাটেগরিটি পাওয়া যায়নি অথবা এখানে কোনো পণ্য নেই।" />
      </div>
    );
  }

  return (
    <div className="container-bz space-y-4 py-6">
      <header className="card-bz flex items-center gap-4 p-5">
        <span className="text-4xl">{cat?.emoji || state.items[0]?.emoji || "🛒"}</span>
        <div>
          <h1 className="text-2xl font-bold">{cat?.name || slug}</h1>
          <p className="text-sm text-base-content/70">{toBn(state.items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </header>

      <div className="card-bz flex items-center justify-end p-4">
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={`${p.id}-${p.slug}`} product={p} />
        ))}
      </div>
    </div>
  );
}
