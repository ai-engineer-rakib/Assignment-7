"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProtectedRoute({ children, fallback }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
      router.replace(`/signin?callbackURL=${encodeURIComponent(pathname || "/")}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending || !session?.user)
    return (
      fallback || (
        <div className="container-bz py-10">
          <div className="skeleton h-64 w-full" />
        </div>
      )
    );
  return children;
}
