import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ServiceCard } from "@/components/shared/service-card";
import { CTASection } from "@/components/shared/cta-section";
import { services } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Green hydrogen, cyber security, Odoo ERP with facial recognition, RMS telecom, and carbon & climate solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our Services"
        title="Five practices. One engineering standard."
        description="Every BITRMS vertical is run by specialists, but every engagement is held to the same standard of rigor, transparency, and long-term partnership."
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <CTASection />
    </>
  );
}
