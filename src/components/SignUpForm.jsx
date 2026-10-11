"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import AuthShell, { Divider, Field } from "./AuthShell";

export default function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const cb = params.get("callbackURL");
  const target = cb && cb.startsWith("/") ? cb : "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    let m = "";
    if (!name) m = "আপনার নাম দিন";
    else if (!email) m = "ইমেইল দিন";
    else if (password.length < 8) m = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    else if (password !== confirm) m = "পাসওয়ার্ড দুটি মিলছে না";
    if (m) {
      setError(m);
      return toast.error(m);
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({ name, email, password });
      if (error) {
        const msg = error.message || "রেজিস্ট্রেশন করা যায়নি";
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
      router.push(target !== "/" ? `/signin?callbackURL=${encodeURIComponent(target)}` : "/signin");
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const signinHref = target !== "/" ? `/signin?callbackURL=${encodeURIComponent(target)}` : "/signin";

  return (
    <AuthShell title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && <div className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</div>}
        <Field label="নাম">
          <input name="name" type="text" placeholder="যেমন: রহিম উদ্দিন" className="field-input" autoComplete="name" />
        </Field>
        <Field label="ইমেইল">
          <input name="email" type="email" placeholder="you@example.com" className="field-input" autoComplete="email" />
        </Field>
        <Field label="পাসওয়ার্ড">
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="field-input" autoComplete="new-password" />
        </Field>
        <Field label="পাসওয়ার্ড নিশ্চিত করুন">
          <input name="confirm" type="password" placeholder="আবার লিখুন" className="field-input" autoComplete="new-password" />
        </Field>
        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-0 w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL={target} />
      <p className="mt-5 text-center text-sm text-base-content/70">
        অ্যাকাউন্ট আছে?{" "}
        <Link href={signinHref} className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}
