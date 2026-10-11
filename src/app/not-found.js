import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <div className="container-bz py-12">
      <EmptyState title="পেজটি পাওয়া যায়নি" message="আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।" />
    </div>
  );
}
