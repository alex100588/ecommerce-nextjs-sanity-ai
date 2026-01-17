import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,

  fields: [
    // =========================
    // Title
    // =========================
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .error("Category title is required"),
    }),

    // =========================
    // Slug (UNIQUE)
    // =========================
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        isUnique: (value, context) =>
          context.defaultIsUnique(value, context),
      },
      validation: (rule) =>
        rule.required().error("Slug is required for URL generation"),
    }),

    // =========================
    // Image
    // =========================
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Category thumbnail image",
    }),
  ],

  // =========================
  // Preview in Studio
  // =========================
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
