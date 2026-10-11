import Link from "next/link";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>
      </div>
      <div className="card-bz p-6">{children}</div>
      <Link href="/" className="mt-5 inline-block text-sm text-base-content/70 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-4 flex items-center gap-3 text-xs text-base-content/60">
      <span className="h-px flex-1 bg-base-300" />
      অথবা
      <span className="h-px flex-1 bg-base-300" />
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}
