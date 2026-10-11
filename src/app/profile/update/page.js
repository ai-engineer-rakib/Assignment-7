import ProtectedRoute from "@/components/ProtectedRoute";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default function UpdateProfilePage() {
  return (
    <ProtectedRoute>
      <UpdateProfileForm />
    </ProtectedRoute>
  );
}
