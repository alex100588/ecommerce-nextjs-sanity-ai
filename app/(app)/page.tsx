
import { sanityFetch } from "@/sanity/lib/live";

export default async function Home() {
  const categories = await sanityFetch({
    query: `*[_type == "category"]`,
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
