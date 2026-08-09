import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { StatBar } from "@/components/home/stat-bar";
import { ClientLogos, type ClientLogoItem } from "@/components/home/client-logos";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { ProjectCard } from "@/components/shared/project-card";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import { CTASection } from "@/components/shared/cta-section";
import { sanityFetch } from "@/sanity/fetch";
import { clientLogosQuery, homePageQuery, projectsQuery, testimonialsQuery } from "@/sanity/queries";
import { services } from "@/lib/content/services";
import { stats as fallbackStats } from "@/lib/content/site";
import type { Project, Testimonial } from "@/lib/content/types";

interface HomePageData {
  heroKicker?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  stats?: { value: string; label: string }[];
}

export default async function HomePage() {
  const [home, testimonials, clients, projects] = await Promise.all([
    sanityFetch<HomePageData>(homePageQuery),
    sanityFetch<Testimonial[]>(testimonialsQuery),
    sanityFetch<ClientLogoItem[]>(clientLogosQuery),
    sanityFetch<Project[]>(projectsQuery),
  ]);

  const heroKicker = home?.heroKicker || "Engineering Across Five Critical Domains";
  const heroTitle = home?.heroTitle || "Engineering a Smarter, Safer, Cleaner Future";
  const heroSubtitle =
    home?.heroSubtitle ||
    "BITRMS delivers green hydrogen, cyber security, enterprise automation, and telecom infrastructure solutions engineered for reliability and long-term partnership.";
  const stats = home?.stats?.length ? home.stats : fallbackStats;
  const featuredProjects = (projects || []).slice(0, 3);

  return (
    <>
      <Hero kicker={heroKicker} title={heroTitle} subtitle={heroSubtitle} />
      <StatBar stats={stats} />

      <section className="py-24">
        <Container>
          <SectionHeading
            kicker="What We Do"
            title="Five specialized practices, one accountable partner"
            description="From clean energy infrastructure to digital defense, we bring engineering rigor to every vertical we serve."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                slug={service.slug}
                title={service.title}
                summary={service.summary}
                icon={service.icon}
              />
            ))}
          </div>
        </Container>
      </section>

      <ClientLogos clients={clients || []} />

      {featuredProjects.length > 0 && (
        <section className="py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading kicker="Recent Work" title="Case studies from across our practices" />
              <Link
                href="/projects"
                className="text-sm font-semibold text-accent-400 hover:text-accent-300"
              >
                View all projects &rarr;
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="bg-brand-900 py-24">
          <Container>
            <SectionHeading
              kicker="What Clients Say"
              title="Trusted for reliability, not just delivery"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
