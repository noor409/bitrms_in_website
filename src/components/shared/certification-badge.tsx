import { Award } from "lucide-react";

export function CertificationBadge({
  name,
  issuer,
  year,
}: {
  name: string;
  issuer: string;
  year: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-brand-900/10 bg-white p-4">
      <Award className="h-8 w-8 shrink-0 text-accent-500" />
      <div>
        <p className="text-sm font-bold text-brand-950">{name}</p>
        <p className="text-xs text-brand-500">
          {issuer} &middot; {year}
        </p>
      </div>
    </div>
  );
}
