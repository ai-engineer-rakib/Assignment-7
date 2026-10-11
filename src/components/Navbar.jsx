"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useData } from "./DataProvider";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const { categories, loading } = useData();
  const { data: session, isPending } = authClient.useSession();
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  let current = pathname;
  try {
    current = decodeURIComponent(pathname);
  } catch {}

  const handleSignOut = async () => {
    if (document.activeElement) document.activeElement.blur();
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  const closeMenu = () => document.activeElement && document.activeElement.blur();

  const chip = (active) =>
    `inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 text-sm font-medium transition ${
      active ? "bg-primary text-primary-content" : "text-base-content hover:bg-base-200"
    }`;

  const user = session?.user;

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="container-bz flex items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg">🛒</span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold">বাজার দর</span>
            <span className="min-h-[1rem] text-xs text-base-content/60">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-10 w-28" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold hover:bg-base-200">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-9 w-9 rounded-[10px] object-cover" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-primary text-sm text-primary-content">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden max-w-[110px] truncate sm:inline">{user.name}</span>
                <span className="text-xs">▾</span>
              </div>
              <div tabIndex={0} className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg">
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-base-content/60">{user.email}</p>
                </div>
                <div className="my-1 border-t border-base-300" />
                <Link href="/profile" onClick={closeMenu} className="flex rounded-lg px-3 py-2 text-sm hover:bg-base-200">
                  👤 আমার প্রোফাইল
                </Link>
                <Link href="/compare" onClick={closeMenu} className="flex rounded-lg px-3 py-2 text-sm hover:bg-base-200">
                  ⚖️ বাজার তুলনা
                </Link>
                <button onClick={handleSignOut} className="flex w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-base-200">
                  ↩ সাইন আউট
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-sm h-10 min-h-0 border-base-content/80 text-base-content hover:bg-base-200 hover:text-base-content sm:px-5">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-sm h-10 min-h-0 sm:px-5">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-300">
        <div className="container-bz flex items-center gap-1 overflow-x-auto py-2 [scrollbar-width:thin]">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-8 w-[72px] shrink-0" />)
            : categories.map((c) => (
                <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} className={chip(current === `/category/${c.slug}`)}>
                  {c.emoji ? <span>{c.emoji}</span> : null}
                  <span>{c.name}</span>
                </Link>
              ))}
        </div>
      </nav>
    </header>
  );
}
