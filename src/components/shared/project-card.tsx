import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Image as SanityImage } from "sanity";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getServiceBySlug } from "@/lib/content/services";
import { urlForImage } from "@/sanity/image";

export function ProjectCard({
  slug,
  title,
  client,
  year,
  summary,
  serviceSlug,
  coverImage,
}: {
  slug: string;
  title: string;
  client: string;
  year: string;
  summary: string;
  serviceSlug: string;
  coverImage?: SanityImage;
}) {
  const service = getServiceBySlug(serviceSlug);

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-accent-100 via-accent-100 to-accent-200">
        {coverImage ? (
          <Image
            src={urlForImage(coverImage).width(600).height(320).fit("crop").url()}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          service && (
            <ServiceIcon
              icon={service.icon}
              className="h-16 w-16 text-accent-500"
              iconClassName="h-10 w-10"
            />
          )
        )}
        <span className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-800 backdrop-blur">
          {year}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        {service && (
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
            {service.shortTitle}
          </p>
        )}
        <h3 className="mt-2 text-lg font-bold text-brand-950">{title}</h3>
        <p className="mt-1 text-sm text-brand-500">{client}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-700">{summary}</p>
        <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent-600">
          View case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
