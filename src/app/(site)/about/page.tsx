import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CertificationBadge } from "@/components/shared/certification-badge";
import { RecognitionLogos } from "@/components/shared/recognition-logos";
import { CTASection } from "@/components/shared/cta-section";
import { sanityFetch } from "@/sanity/fetch";
import { aboutPageQuery, certificationsQuery, recognitionQuery } from "@/sanity/queries";
import { missionVisionValues } from "@/lib/content/site";
import type { Certification } from "@/lib/content/types";
import type { Image as SanityImage } from "sanity";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BITRMS is an engineering partner across green hydrogen, cyber security, enterprise automation, and telecom infrastructure.",
};

interface AboutPageData {
  mission?: string;
  vision?: string;
  values?: { title: string; description: string }[];
}

interface RecognitionItem {
  name: string;
  url?: string;
  logo: SanityImage;
}

export default async function AboutPage() {
  const about = await sanityFetch<AboutPageData>(aboutPageQuery);
  const certifications = await sanityFetch<Certification[]>(certificationsQuery);
  const recognitions = await sanityFetch<RecognitionItem[]>(recognitionQuery);

  const mission = about?.mission || missionVisionValues.mission;
  const vision = about?.vision || missionVisionValues.vision;
  const values = about?.values?.length ? about.values : missionVisionValues.values;

  return (
    <>
      <PageHero
        kicker="About BITRMS"
        title="Engineering across five practices"
        description="BITRMS is an engineering partner spanning clean energy, security, automation, and climate technology — built around specialist teams for each practice."
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading kicker="Mission" title="Why we exist" />
              <p className="mt-4 text-base leading-relaxed text-brand-300">{mission}</p>
            </div>
            <div>
              <SectionHeading kicker="Vision" title="Where we're headed" />
              <p className="mt-4 text-base leading-relaxed text-brand-300">{vision}</p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/10 bg-brand-900 p-6">
                <h3 className="text-base font-bold text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-300">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {certifications && certifications.length > 0 && (
        <section className="bg-brand-900 py-24">
          <Container>
            <SectionHeading kicker="Recognition" title="Certifications & accreditations" align="center" className="mx-auto" />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => (
                <CertificationBadge key={cert.name} {...cert} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <RecognitionLogos items={recognitions || []} />

      <CTASection />
    </>
  );
}
