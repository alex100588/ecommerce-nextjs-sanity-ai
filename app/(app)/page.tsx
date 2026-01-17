import { CategoryTitles } from "@/components/homePage/CategoryTitles";
import { FeaturedCarousel } from "@/components/homePage/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/homePage/FeaturedCarouselComponent";
import { ProductSection } from "@/components/homePage/ProductSection";
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

// ============================================
// Tipuri pentru searchParams
// ============================================
// Reprezintă parametrii care pot veni din URL (ex: ?searchTerm=chair&category=furniture)
interface PageProps {
  searchParams: Promise <{
    searchTerm?: string;
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

  console.log("Parametri URL:", params); // aici vad ce vine din URL-ul paginii

  // ============================================
  // Extragem parametrii și setăm valori implicite
  // ============================================
  const searchQuery = params.searchTerm ?? ""; // "q" în exemplele tale anterioare
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
  // Fetch produse filtrate de la Sanity
  // ============================================
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

  // ============================================
  // Fetch categorii pentru sidebar
  // ============================================
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // ============================================
  // Fetch produse featured pentru carousel
  // ============================================
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });
  

  // console.log("Produse filtrate:", products);
  // console.log("Categorii:", categories);
  // console.log("Produse featured:", featuredProducts);

  // ============================================
  // Return UI (React JSX)
  // ============================================
  return (
    <div>
      {/* Featured products carousel */}
      <Suspense fallback={<FeaturedCarouselSkeleton />}>
        <FeaturedCarousel products={featuredProducts}/>
      </Suspense>

      {/* Page banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Shop {categorySlug ? categorySlug : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium furniture for your home
          </p>
        </div>
          {/* Category tiles */}
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
