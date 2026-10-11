import ProtectedRoute from "@/components/ProtectedRoute";
import ProductDetail from "@/components/ProductDetail";

export default function ProductPage({ params }) {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}
  return (
    <ProtectedRoute>
      <ProductDetail slug={slug} />
    </ProtectedRoute>
  );
}
