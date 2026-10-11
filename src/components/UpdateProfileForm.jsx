"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) {
        toast.error(error.message || "আপডেট করা যায়নি");
        return;
      }
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-base-content/70">আপনার নাম পরিবর্তন করুন।</p>
      </div>
      <form onSubmit={onSubmit} className="card-bz space-y-4 p-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" className="field-input" />
        </label>
        <button type="submit" disabled={loading} className="btn btn-primary h-10 min-h-0 w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
        </button>
      </form>
      <Link href="/profile" className="mt-5 inline-block text-sm text-base-content/70 hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
