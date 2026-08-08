import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Hero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 pt-28 pb-24 sm:pt-32 sm:pb-32">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -top-10 right-0 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-300 uppercase backdrop-blur">
            {kicker}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="primary">
              Talk to Our Team
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/services" variant="ghost">
              Explore Services
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
