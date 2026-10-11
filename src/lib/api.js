// Browser -> our own proxy (/api/bazar/*) -> external API (avoids CORS problems)
export async function apiGet(path) {
  const res = await fetch(`/api/bazar${path}`, { cache: "no-store" });
  if (!res.ok) {
    const err = new Error(res.status === 404 ? "NOT_FOUND" : `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}
