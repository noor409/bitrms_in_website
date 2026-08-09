import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ProjectCard } from "@/components/shared/project-card";
import { CTASection } from "@/components/shared/cta-section";
import { sanityFetch } from "@/sanity/fetch";
import { projectsQuery } from "@/sanity/queries";
import type { Project } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies from BITRMS's work across green hydrogen, cyber security, ERP, telecom, and climate.",
};

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>(projectsQuery);

  return (
    <>
      <PageHero
        kicker="Our Work"
        title="Delivered projects across every practice"
        description="A selection of engagements that show how we approach engineering problems end to end."
      />

      <section className="py-24">
        <Container>
          {projects && projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brand-400">
              Case studies are being published here as projects are completed. Check back soon,
              or get in touch to discuss a project directly.
            </p>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
}
