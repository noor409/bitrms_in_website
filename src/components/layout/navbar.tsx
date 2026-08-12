"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "./logo";
import { services } from "@/lib/content/services";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Insights" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-950/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-200 hover:text-white">
              Services
              <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 rounded-xl border border-white/10 bg-brand-900 p-2 shadow-xl">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-200 hover:bg-white/5 hover:text-white"
                  >
                    {service.shortTitle}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-semibold text-accent-400 hover:bg-white/5"
                >
                  View all services
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-brand-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden lg:block">
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>

          <button
            className="text-white lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-950 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-400">
              Services
            </p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-200 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {service.shortTitle}
              </Link>
            ))}
            <div className="my-2 border-t border-white/10" />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-200 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="mt-3 justify-center">
              Get in Touch
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
