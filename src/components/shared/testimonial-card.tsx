import { Quote } from "lucide-react";

export function TestimonialCard({
  name,
  company,
  quote,
}: {
  name: string;
  company: string;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-brand-900/10 bg-white p-7 shadow-sm">
      <Quote className="h-7 w-7 text-accent-400" />
      <p className="mt-4 flex-1 text-base leading-relaxed text-brand-800">&ldquo;{quote}&rdquo;</p>
      <div className="mt-6 border-t border-brand-900/10 pt-4">
        <p className="text-sm font-semibold text-brand-950">{name}</p>
        <p className="text-sm text-brand-500">{company}</p>
      </div>
    </div>
  );
}
