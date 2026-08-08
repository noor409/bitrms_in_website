import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { siteSettings } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BITRMS Technologies.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's talk about your project"
        description="Whether you're scoping a new engagement or need support on an existing one, our team typically responds within one business day."
      />

      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6">
                <h3 className="text-base font-bold text-brand-950">Contact details</h3>
                <ul className="mt-4 space-y-4 text-sm text-brand-700">
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    {siteSettings.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-accent-500" />
                    <a href={`tel:${siteSettings.phone}`} className="hover:text-brand-950">
                      {siteSettings.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-accent-500" />
                    <a href={`mailto:${siteSettings.email}`} className="hover:text-brand-950">
                      {siteSettings.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl border border-brand-900/10">
                <iframe
                  title="Office location map"
                  className="h-64 w-full"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteSettings.address)}&output=embed`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
