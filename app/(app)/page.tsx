import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";

export default async function Home() {
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  console.log(categories);

  return (
    <div className="">
      {/* Featured products carousel */}

      {/* Page banner */}

      {/* Category tiles */}

      {/* Products section */}
    </div>
  );
}
