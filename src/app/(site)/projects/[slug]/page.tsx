import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/shared/prose";
import { PortableTextBody } from "@/components/shared/portable-text-body";
import { CTASection } from "@/components/shared/cta-section";
import { Icon } from "@/components/ui/icon";
import { sanityFetch } from "@/sanity/fetch";
import { projectBySlugQuery } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { getServiceBySlug } from "@/lib/content/services";
import type { Project } from "@/lib/content/types";
import type { PortableTextBlock } from "@portabletext/react";
import type { Image as SanityImage } from "sanity";

export const dynamic = "force-dynamic";

interface ProjectDetail extends Project {
  body?: PortableTextBlock[];
  coverImage?: SanityImage;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<ProjectDetail>(projectBySlugQuery, { slug });
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await sanityFetch<ProjectDetail>(projectBySlugQuery, { slug });
  if (!project) notFound();

  const service = getServiceBySlug(project.serviceSlug);

  return (
    <>
      <PageHero
        kicker={service?.shortTitle}
        title={project.title}
        description={`${project.client} — ${project.location} — ${project.year}`}
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {project.coverImage && (
                <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80">
                  <Image
                    src={urlForImage(project.coverImage).width(1200).height(640).fit("crop").url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {project.body?.length ? (
                <PortableTextBody value={project.body} />
              ) : (
                <Prose paragraphs={[project.summary]} />
              )}
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6">
                {service && (
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-900 text-white">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </div>
                )}
                {project.outcomes?.length > 0 && (
                  <>
                    <h3 className="mt-4 text-base font-bold text-brand-950">Outcomes</h3>
                    <ul className="mt-4 space-y-2.5">
                      {project.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2 text-sm text-brand-700">
                          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection title="Have a similar project in mind?" />
    </>
  );
}
