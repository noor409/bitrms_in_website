import type { MetadataRoute } from "next";
import { services } from "@/lib/content/services";
import { posts } from "@/lib/content/posts";
import { sanityFetch } from "@/sanity/fetch";
import { projectsQuery } from "@/sanity/queries";
import type { Project } from "@/lib/content/types";

const baseUrl = "https://www.bitrms.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await sanityFetch<Project[]>(projectsQuery)) || [];

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/careers",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
