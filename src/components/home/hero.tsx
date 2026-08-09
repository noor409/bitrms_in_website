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
    <section className="relative overflow-hidden bg-white pt-28 pb-24 sm:pt-32 sm:pb-32">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-accent-200/50 blur-3xl" />
      <div className="absolute -top-10 right-0 h-80 w-80 rounded-full bg-signal-400/25 blur-3xl" />

      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-accent-200 bg-accent-100 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-600 uppercase">
            {kicker}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-brand-900 sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-600 sm:text-xl">
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
