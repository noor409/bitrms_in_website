import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sanityFetch } from "@/sanity/fetch";
import { jobsQuery } from "@/sanity/queries";
import { siteSettings } from "@/lib/content/site";
import type { JobOpening } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at BITRMS across cyber security, enterprise solutions, and telecom infrastructure.",
};

export default async function CareersPage() {
  const jobs = (await sanityFetch<JobOpening[]>(jobsQuery)) || [];

  return (
    <>
      <PageHero
        kicker="Careers"
        title="Build infrastructure that matters"
        description="We solve engineering problems across five different domains. If that sounds interesting, we'd like to hear from you."
      />

      <section className="py-24">
        <Container className="max-w-4xl">
          <SectionHeading kicker="Open Roles" title="Current openings" />
          <div className="mt-10 space-y-4">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="rounded-2xl border border-brand-900/10 bg-white p-6 sm:flex sm:items-start sm:justify-between sm:gap-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-brand-950">{job.title}</h3>
                  <p className="mt-1 text-sm text-brand-500">
                    {job.department} &middot; {job.location} &middot; {job.type}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-700">
                    {job.description}
                  </p>
                </div>
                <a
                  href={`mailto:${siteSettings.email}?subject=${encodeURIComponent(
                    `Application: ${job.title}`
                  )}`}
                  className="mt-4 inline-block shrink-0 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600 sm:mt-0"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          {jobs.length === 0 && (
            <p className="mt-10 text-brand-600">
              No open roles right now — check back soon, or send your resume to{" "}
              <a href={`mailto:${siteSettings.email}`} className="font-semibold text-accent-600">
                {siteSettings.email}
              </a>
              .
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
