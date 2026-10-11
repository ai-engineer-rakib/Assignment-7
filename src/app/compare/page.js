import ProtectedRoute from "@/components/ProtectedRoute";
import CompareView from "@/components/CompareView";

export const metadata = { title: "বাজার তুলনা | বাজার দর" };

export default function ComparePage() {
  return (
    <ProtectedRoute>
      <CompareView />
    </ProtectedRoute>
  );
}
