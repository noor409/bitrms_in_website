import { defineField, defineType } from "sanity";

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job Opening",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "type",
      title: "Employment Type",
      type: "string",
      options: { list: ["Full-time", "Part-time", "Contract", "Internship"] },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "title", subtitle: "department" },
  },
});
