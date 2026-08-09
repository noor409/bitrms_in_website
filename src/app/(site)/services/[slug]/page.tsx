import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CircleCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Prose } from "@/components/shared/prose";
import { ProjectCard } from "@/components/shared/project-card";
import { CTASection } from "@/components/shared/cta-section";
import { ServiceIcon } from "@/components/ui/service-icon";
import { ServiceSectionBackground } from "@/components/ui/service-section-background";
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

      <section className="relative overflow-hidden py-24">
        <ServiceSectionBackground icon={service.icon} className="absolute inset-0 h-full w-full" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Prose paragraphs={service.body} />
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl border border-white/10 bg-brand-900 p-6">
                <ServiceIcon
                  icon={service.icon}
                  className="h-11 w-11 rounded-lg bg-accent-500/10 text-accent-400"
                  iconClassName="h-5 w-5"
                />
                <h3 className="mt-4 text-base font-bold text-white">Key Offerings</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-brand-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-brand-900 p-6">
                <h3 className="text-base font-bold text-white">Benefits</h3>
                <ul className="mt-4 space-y-2.5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-brand-300">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
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
        <section className="bg-brand-900 py-24">
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
