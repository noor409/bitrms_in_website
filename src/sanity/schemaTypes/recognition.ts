import { defineField, defineType } from "sanity";

export const recognition = defineType({
  name: "recognition",
  title: "Recognition / Support",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "Website URL (optional)", type: "url" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
