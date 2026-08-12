import { Container } from "@/components/ui/container";
import { NetworkBackground } from "@/components/ui/network-background";

export function PageHero({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 py-24">
      <NetworkBackground className="absolute inset-0 h-full w-full" density={0.6} />
      <div className="bg-dots light:block absolute inset-0 hidden" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/70 to-transparent" />

      <Container className="relative max-w-3xl">
        {kicker && (
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent-400 uppercase">
            {kicker}
          </p>
        )}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg leading-relaxed text-brand-300">{description}</p>
        )}
      </Container>
    </section>
  );
}
