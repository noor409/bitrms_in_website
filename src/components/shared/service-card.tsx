import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { IconKey } from "@/lib/content/types";

export function ServiceCard({
  slug,
  title,
  summary,
  icon,
}: {
  slug: string;
  title: string;
  summary: string;
  icon: IconKey;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-brand-900 p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
    >
      <div>
        <ServiceIcon
          icon={icon}
          className="h-12 w-12 rounded-xl bg-accent-500/10 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-brand-950"
          iconClassName="h-6 w-6"
        />
        <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-300">{summary}</p>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-accent-400">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
