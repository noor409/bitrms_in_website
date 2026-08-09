import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { services } from "@/lib/content/services";
import { siteSettings } from "@/lib/content/site";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50 text-brand-600">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-500">
            {siteSettings.tagline} Engineering infrastructure that keeps businesses running.
          </p>
          <a
            href={siteSettings.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand-500 hover:text-accent-600"
          >
            <ExternalLink className="h-4 w-4" /> LinkedIn
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-900">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-brand-500 hover:text-accent-600"
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-900">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-brand-500 hover:text-accent-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brand-900">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-500">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {siteSettings.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${siteSettings.phone}`} className="hover:text-accent-600">
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${siteSettings.email}`} className="hover:text-accent-600">
                {siteSettings.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-brand-100 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-brand-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.
          </p>
          <p>Admin panel: <Link href="/studio" className="hover:text-accent-600">/studio</Link></p>
        </Container>
      </div>
    </footer>
  );
}
