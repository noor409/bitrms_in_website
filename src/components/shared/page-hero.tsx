import { Container } from "@/components/ui/container";

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
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
      <Container className="relative max-w-3xl">
        {kicker && (
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent-300 uppercase">
            {kicker}
          </p>
        )}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg leading-relaxed text-brand-100">{description}</p>
        )}
      </Container>
    </section>
  );
}
