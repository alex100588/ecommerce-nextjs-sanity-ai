"use client";

import Link from "next/link";
import Image from "next/image";
import { Grid2x2 } from "lucide-react";
import { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface CategoryTilesProps {
  categories: ALL_CATEGORIES_QUERYResult;
  activeCategory?: string;
}

export function CategoryTitles({
  categories,
  activeCategory,
}: CategoryTilesProps) {
  // Pas 1: Filtrăm duplicatele după slug folosind Map pentru a păstra doar un element pentru fiecare slug
  const uniqueCategories = Array.from(
    new Map(categories.map((cat) => [cat.slug, cat])).values()
  );

  return (
    <div className="relative">
      {/* Container pentru scroll orizontal */}
      <div className="flex gap-4 overflow-x-auto py-4 pl-8 pr-4 sm:pl-12 sm:pr-6 lg:pl-10 lg:pr-8 scrollbar-hide">
        
        {/* Tile pentru "All Products" */}
        <Link
          href="/"
          className={`group relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
            !activeCategory
              ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900"
              : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
          }`}
        >
          <div className="relative h-32 w-56 sm:h-56 sm:w-80">
            {/* Gradient pentru background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800" />
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Grid2x2 className="h-12 w-12 text-white/60 transition-transform duration-300 group-hover:scale-110" />
            </div>
            {/* Overlay întunecat pentru text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-base font-semibold text-white drop-shadow-md">
                All Products
              </span>
            </div>
          </div>
        </Link>

        {/* Afișăm fiecare categorie */}
        {uniqueCategories.map((category) => {
          const isActive = activeCategory === category.slug; // Verificăm dacă este categoria activă
          const imageUrl = category.image?.asset?.url; // Url-ul imaginii pentru fiecare categorie

          return (
            <Link
              key={category._id} // Folosim _id ca "key" pentru fiecare categorie
              href={`/?category=${category.slug}`} // Link-ul pentru fiecare categorie
              className={`group relative flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? "ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-zinc-900" // Efectul activ pentru categoria curentă
                  : "hover:ring-2 hover:ring-zinc-300 hover:ring-offset-2 dark:hover:ring-zinc-600 dark:hover:ring-offset-zinc-900"
              }`}
            >
              <div className="relative h-32 w-56 sm:h-56 sm:w-80">
                {/* Dacă avem URL pentru imagine, o încărcăm; altfel, folosim un gradient */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={category.title ?? "Category"} // Dacă nu există titlu, punem "Category"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600" />
                )}

                {/* Overlay pentru text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

                {/* Numele categoriei */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-base font-semibold text-white drop-shadow-md">
                    {category.title} {/* Afișăm titlul categoriei */}
                  </span>
                </div>

                {/* Indicator pentru categoria activă */}
                {isActive && (
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
