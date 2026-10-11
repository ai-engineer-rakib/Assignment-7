import CategoryView from "@/components/CategoryView";

export default function CategoryPage({ params }) {
  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}
  return <CategoryView slug={slug} />;
}
