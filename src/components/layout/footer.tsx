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
    <footer className="border-t border-white/10 bg-brand-950 text-brand-300">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-brand-400">
            {siteSettings.tagline} Engineering infrastructure that keeps businesses running.
          </p>
          <a
            href={siteSettings.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-brand-400 hover:text-accent-400"
          >
            <ExternalLink className="h-4 w-4" /> LinkedIn
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-brand-400 hover:text-accent-400"
                >
                  {service.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-brand-400 hover:text-accent-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-400">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {siteSettings.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${siteSettings.phone}`} className="hover:text-accent-400">
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${siteSettings.email}`} className="hover:text-accent-400">
                {siteSettings.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-brand-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.
          </p>
          <p>Admin panel: <Link href="/studio" className="hover:text-accent-400">/studio</Link></p>
        </Container>
      </div>
    </footer>
  );
}
