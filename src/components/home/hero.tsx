import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";

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
      <NetworkBackground className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/70 to-transparent" />

      <Container className="relative">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-400 uppercase">
            {kicker}
          </p>
          <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-300 sm:text-xl">
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
