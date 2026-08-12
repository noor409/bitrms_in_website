import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "@/components/ui/network-background";

export function CTASection({
  title = "Ready to talk about your project?",
  description = "Tell us what you're building and we'll get back to you within one business day.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-brand-900 py-20">
      <NetworkBackground className="absolute inset-0 h-full w-full" density={0.6} />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-lg text-brand-300">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/contact" variant="primary">
            Get in Touch
          </Button>
          <Button href="/services" variant="ghost">
            Explore Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
