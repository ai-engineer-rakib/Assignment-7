"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }) {
  const go = async (provider, label) => {
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL });
      if (error) toast.error(error.message || `${label} দিয়ে সাইন ইন করা যায়নি`);
    } catch {
      toast.error(`${label} দিয়ে সাইন ইন করা যায়নি`);
    }
  };
  const btn =
    "flex h-10 items-center justify-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 text-sm font-medium transition hover:bg-base-200";
  return (
    <div className="grid grid-cols-2 gap-3">
      <button type="button" onClick={() => go("google", "Google")} className={btn}>
        <svg className="h-[13px] w-[13px]" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
        </svg>
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => go("github", "GitHub")} className={btn}>
        <svg className="h-[14px] w-[14px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.3 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z" />
        </svg>
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
