const BN = "০১২৩৪৫৬৭৮৯";

export const toBn = (v) => String(v).replace(/\d/g, (d) => BN[d]);

export const fromBn = (v) =>
  typeof v === "string" ? v.replace(/[০-৯]/g, (d) => String(BN.indexOf(d))) : v;

// Bengali / English numeral string -> number (NaN if impossible)
export function toNum(v) {
  if (v === null || v === undefined) return NaN;
  if (typeof v === "number") return v;
  const s = fromBn(String(v)).replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return s ? parseFloat(s[0]) : NaN;
}

export function formatPrice(n) {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 100) / 100;
  return toBn(r.toLocaleString("en-US", { maximumFractionDigits: 2 })) + " টাকা";
}

export function formatChange(c) {
  const n = Number.isFinite(c) ? c : 0;
  if (n > 0) return `▲ ${toBn(n.toFixed(1))}%`;
  if (n < 0) return `▼ ${toBn(Math.abs(n).toFixed(1))}%`;
  return "—০.০%";
}

export function sortProducts(list, mode) {
  if (mode === "asc") return [...list].sort((a, b) => a.price - b.price);
  if (mode === "desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

// "১,৮৫০" (no unit)
export function formatNum(n) {
  if (!Number.isFinite(n)) return "—";
  const r = Math.round(n * 100) / 100;
  return toBn(r.toLocaleString("en-US", { maximumFractionDigits: 2 }));
}

// absolute amount that the price moved vs yesterday (derived from % change)
export function changeAmount(price, change) {
  if (!Number.isFinite(price) || !Number.isFinite(change) || change === -100) return 0;
  return Math.abs(Math.round(price - price / (1 + change / 100)));
}
