import { toNum } from "./format";

// API: https://openapi.programming-hero.com/api/bazardor
// list endpoints return plain arrays; unwrap defensively anyway.
export function unwrapList(d) {
  if (Array.isArray(d)) return d;
  if (d && typeof d === "object") {
    for (const k of ["data", "products", "categories", "items", "results"]) {
      if (Array.isArray(d[k])) return d[k];
    }
  }
  return [];
}

export function unwrapOne(d) {
  if (Array.isArray(d)) return d[0];
  if (d && typeof d === "object") {
    for (const k of ["data", "product", "category", "item"]) {
      if (d[k] && typeof d[k] === "object" && !Array.isArray(d[k])) return d[k];
    }
  }
  return d;
}

const UNIT_BN = {
  kg: "কেজি",
  kilogram: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export function unitBn(u) {
  const raw = String(u ?? "kg").trim();
  const bn = UNIT_BN[raw.toLowerCase()] || raw;
  return `প্রতি ${bn}`;
}

export function normalizeCategory(c) {
  if (!c || typeof c !== "object") return { slug: String(c ?? ""), name: String(c ?? ""), emoji: "" };
  const slug = String(c.slug ?? c.id ?? "");
  return {
    slug,
    name: String(c.nameBn ?? c.name_bn ?? c.name ?? slug),
    emoji: String(c.icon ?? c.emoji ?? ""),
  };
}

function normalizeMarket(m) {
  const min = toNum(m.min);
  const max = toNum(m.max);
  const avg = Number.isFinite(min) && Number.isFinite(max) ? Math.round((min + max) / 2) : NaN;
  return {
    name: String(m.market ?? m.name ?? "বাজার"),
    area: String(m.division ?? m.area ?? ""),
    min,
    max,
    avg,
    price: avg,
  };
}

export function normalizeProduct(p) {
  const price = toNum(p.today ?? p.price);
  const prev = toNum(p.yesterday);

  // change: { dir: "up" | "down" | "flat", pct: number }
  let change = 0;
  if (p.change && typeof p.change === "object") {
    change = toNum(p.change.pct);
    if (!Number.isFinite(change)) change = 0;
    if (p.change.dir === "down") change = -Math.abs(change);
    else if (p.change.dir === "up") change = Math.abs(change);
    else if (p.change.dir === "flat") change = 0;
  } else if (Number.isFinite(prev) && prev !== 0 && Number.isFinite(price)) {
    change = Math.round(((price - prev) / prev) * 1000) / 10;
  }

  const markets = Array.isArray(p.markets) ? p.markets.map(normalizeMarket) : [];
  const mins = markets.map((m) => m.min).filter(Number.isFinite);
  const maxs = markets.map((m) => m.max).filter(Number.isFinite);

  const slug = String(p.slug ?? p.id ?? "");
  return {
    id: String(p.id ?? slug),
    slug,
    name: String(p.nameBn ?? p.name_bn ?? p.name ?? "পণ্য"),
    emoji: String(p.image ?? p.categoryIcon ?? "🛒"),
    unit: unitBn(p.unit),
    description: String(p.description ?? ""),
    price,
    prev,
    lastWeek: toNum(p.lastWeek),
    lastMonth: toNum(p.lastMonth),
    change,
    categorySlug: String(p.category ?? ""),
    categoryName: String(p.categoryNameBn ?? ""),
    categoryIcon: String(p.categoryIcon ?? ""),
    tags: [],
    markets,
    min: mins.length ? Math.min(...mins) : price,
    max: maxs.length ? Math.max(...maxs) : price,
    avg: price,
  };
}
