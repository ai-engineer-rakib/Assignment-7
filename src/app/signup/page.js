import { Suspense } from "react";
import SignUpForm from "@/components/SignUpForm";

export const metadata = { title: "সাইন আপ | বাজার দর" };

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto my-10 h-[34rem] w-full max-w-md" />}>
      <SignUpForm />
    </Suspense>
  );
}
