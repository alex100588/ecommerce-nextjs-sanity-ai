import { CategoryTitles } from "@/components/homePage/CategoryTitles";
import { FeaturedCarousel } from "@/components/homePage/FeaturedCarousel";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_CATEGORIES_QUERY } from "@/sanity/queries/categories";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/sanity/queries/products";
import { Suspense } from "react";
import { FeaturedCarouselSkeleton } from "@/components/homePage/FeaturedCarouselSkeleton";
import { ProductSection } from "@/components/homePage/ProductSection";

// ============================================
// Tipuri pentru searchParams
// ============================================
// Reprezintă parametrii care pot veni din URL (ex: ?searchTerm=chair&category=furniture)
interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    color?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

// ============================================
// Funcția paginii principale
// ============================================
export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // ============================================
  // Extragem parametrii și setăm valori implicite
  // ============================================
  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  // ============================================
  // Aleg query-ul Sanity în funcție de sort
  // ============================================
  const getQuery = () => {
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }

    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };
  
  // ============================================
  // Fetch produse featured pentru carousel
  // ============================================
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });
  // console.log("Products fetch result:", products);
  
  // ============================================
  // Fetch categorii
  // ============================================
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // ============================================
  // Fetch produse filtrate de la Sanity
  // ============================================
  // iau proprietatea data din obiectul returnat si o redenumesc in products
  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      color,
      material,
      minPrice,
      maxPrice,
      inStock,
    },
  });

  return (
    <div>
      {/* Featured products carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel products={featuredProducts} />
      </Suspense>

      {/* Page banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Shop {categorySlug ? categorySlug : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium {categorySlug || "products"} for your home or fashion
          </p>
        </div>
        {/* Categoriile pentru a le putea selecta */}
        <div className="mt-6">
          <CategoryTitles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>
      {/* Products section */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
