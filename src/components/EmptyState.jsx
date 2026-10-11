import Link from "next/link";

export default function EmptyState({ title = "কিছু পাওয়া যায়নি", message = "আপনি যা খুঁজছেন তা পাওয়া যায়নি।" }) {
  return (
    <div className="card-bz mx-auto max-w-md px-6 py-14 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <h2 className="mt-3 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
