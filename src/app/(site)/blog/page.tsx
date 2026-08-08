import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { posts } from "@/lib/content/posts";

export const metadata: Metadata = {
  title: "Insights",
  description: "Engineering perspectives from BITRMS on green hydrogen, cyber security, ERP, and telecom infrastructure.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        kicker="Insights"
        title="Notes from the field"
        description="Perspectives from our engineering teams on the trends shaping our five practices."
      />

      <section className="py-24">
        <Container className="max-w-4xl">
          <div className="divide-y divide-brand-900/10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-8 first:pt-0"
              >
                <p className="text-xs font-semibold tracking-wide text-accent-600 uppercase">
                  {post.category} &middot; {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                <h2 className="mt-2 flex items-center gap-2 text-xl font-bold text-brand-950 group-hover:text-accent-600">
                  {post.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-600">{post.excerpt}</p>
                <p className="mt-3 text-sm font-medium text-brand-500">By {post.author}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
