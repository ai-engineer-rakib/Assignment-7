"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import AuthShell, { Divider, Field } from "./AuthShell";

export default function SignInForm() {
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
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    if (!email || !password) {
      const m = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(m);
      return toast.error(m);
    }
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        const m = error.message || "ইমেইল বা পাসওয়ার্ড ভুল";
        setError(m);
        toast.error(m);
        return;
      }
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push(target);
      router.refresh();
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন");
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const signupHref = target !== "/" ? `/signup?callbackURL=${encodeURIComponent(target)}` : "/signup";

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {error && <div className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{error}</div>}
        <Field label="ইমেইল">
          <input name="email" type="email" placeholder="you@example.com" className="field-input" autoComplete="email" />
        </Field>
        <Field label="পাসওয়ার্ড">
          <input name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="field-input" autoComplete="current-password" />
        </Field>
        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-0 w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>
      <Divider />
      <SocialButtons callbackURL={target} />
      <p className="mt-5 text-center text-sm text-base-content/70">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={signupHref} className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}
