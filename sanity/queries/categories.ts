import { defineQuery } from "next-sanity";

/**
 * Get all categories
 * Used for navigation and filters
 * EXCLUDES drafts
 */
export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[
    _type == "category" &&
    !(_id in path("drafts.**"))
  ]
  | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "image": image{
      asset->{
        _id,
        url
      },
      hotspot
    }
  }
`);

/**
 * Get category by slug
 * EXCLUDES drafts
 */
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "category" &&
    slug.current == $slug &&
    !(_id in path("drafts.**"))
  ][0] {
    _id,
    title,
    "slug": slug.current,
    "image": image{
      asset->{
        _id,
        url
      },
      hotspot
    }
  }
`);
