import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Prose } from "@/components/shared/prose";
import { ProjectCard } from "@/components/shared/project-card";
import { CTASection } from "@/components/shared/cta-section";
import { Icon } from "@/components/ui/icon";
import { sanityFetch } from "@/sanity/fetch";
import { projectsByServiceQuery, serviceBySlugQuery } from "@/sanity/queries";
import { getServiceBySlug, services } from "@/lib/content/services";
import type { Project, Service } from "@/lib/content/types";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallback = getServiceBySlug(slug);
  const [cms, relatedProjects] = await Promise.all([
    sanityFetch<Partial<Service>>(serviceBySlugQuery, { slug }),
    sanityFetch<Project[]>(projectsByServiceQuery, { slug }),
  ]);

  if (!fallback && !cms) notFound();

  const service = { ...fallback, ...cms } as Service;

  return (
    <>
      <PageHero kicker={service.heroKicker} title={service.title} description={service.summary} />

      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Prose paragraphs={service.body} />
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-900 text-white">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-950">Key Offerings</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-brand-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-900/10 bg-white p-6">
                <h3 className="text-base font-bold text-brand-950">Benefits</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-brand-700">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {relatedProjects && relatedProjects.length > 0 && (
        <section className="bg-brand-50 py-24">
          <Container>
            <SectionHeading kicker="In Practice" title="Related projects" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title={`Ready to discuss your ${service.title.toLowerCase()} project?`}
      />
    </>
  );
}
