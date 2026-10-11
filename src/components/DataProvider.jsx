"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { normalizeCategory, normalizeProduct, unwrapList } from "@/lib/normalize";

const Ctx = createContext({ products: [], categories: [], loading: true, error: false });

export function DataProvider({ children }) {
  const [state, setState] = useState({ products: [], categories: [], loading: true, error: false });

  useEffect(() => {
    let alive = true;
    Promise.allSettled([apiGet("/products"), apiGet("/categories")]).then(([p, c]) => {
      if (!alive) return;
      setState({
        products: p.status === "fulfilled" ? unwrapList(p.value).map(normalizeProduct) : [],
        categories: c.status === "fulfilled" ? unwrapList(c.value).map(normalizeCategory) : [],
        loading: false,
        error: p.status === "rejected",
      });
    });
    return () => {
      alive = false;
    };
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useData = () => useContext(Ctx);
