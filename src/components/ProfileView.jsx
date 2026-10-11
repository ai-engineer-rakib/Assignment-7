"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const u = session?.user;
  if (!u) return null;

  const signOut = async () => {
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-4 py-10">
      <div className="mb-2">
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <div className="card-bz flex flex-wrap items-center gap-4 p-6">
        {u.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.image} alt="" className="h-[70px] w-[70px] rounded-2xl object-cover" />
        ) : (
          <span className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary text-3xl text-primary-content">
            {(u.name || "U").charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-bold">{u.name}</p>
          <p className="truncate text-sm text-base-content/70">{u.email}</p>
        </div>
        <button
          onClick={signOut}
          className="btn btn-outline btn-sm h-10 min-h-0 border-error text-error hover:border-error hover:bg-error hover:text-error-content"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="card-bz p-6">
        <h2 className="mb-4 text-xl font-bold">তথ্য</h2>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input readOnly value={u.name || ""} className="field-input" />
        </label>
        <Link href="/profile/update" className="btn btn-primary mt-4 h-10 min-h-0 w-full">
          আপডেট
        </Link>
      </div>
    </div>
  );
}
