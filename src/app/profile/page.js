import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileView from "@/components/ProfileView";

export const metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
}
