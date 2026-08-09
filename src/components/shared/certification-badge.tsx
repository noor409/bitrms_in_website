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
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-brand-900 p-4">
      <Award className="h-8 w-8 shrink-0 text-accent-400" />
      <div>
        <p className="text-sm font-bold text-white">{name}</p>
        <p className="text-xs text-brand-400">
          {issuer} &middot; {year}
        </p>
      </div>
    </div>
  );
}
