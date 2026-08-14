import { defineField, defineType } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client / Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", title: "Website URL", type: "url" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Client", "Partner"], layout: "radio" },
      initialValue: "Client",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
