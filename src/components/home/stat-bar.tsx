import { Container } from "@/components/ui/container";

export function StatBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="bg-brand-950 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-900 p-6 text-center sm:p-8">
              <p className="text-3xl font-bold text-accent-500 sm:text-4xl">{stat.value}</p>
              <p className="mt-1.5 text-sm text-brand-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
