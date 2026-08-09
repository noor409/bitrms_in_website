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
    <section className="relative overflow-hidden bg-brand-50 py-24">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-200/60 blur-3xl" />
      <Container className="relative max-w-3xl">
        {kicker && (
          <p className="mb-3 text-sm font-semibold tracking-wide text-accent-600 uppercase">
            {kicker}
          </p>
        )}
        <h1 className="text-balance text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-lg leading-relaxed text-brand-600">{description}</p>
        )}
      </Container>
    </section>
  );
}
