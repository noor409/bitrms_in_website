import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification / Recognition",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    select: { title: "name", subtitle: "issuer" },
  },
});
