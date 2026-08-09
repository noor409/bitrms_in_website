import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { Container } from "@/components/ui/container";
import { urlForImage } from "@/sanity/image";

export interface ClientLogoItem {
  name: string;
  url?: string;
  logo?: SanityImage;
}

export function ClientLogos({ clients }: { clients: ClientLogoItem[] }) {
  if (clients.length === 0) return null;

  return (
    <section className="bg-brand-900 py-16">
      <Container>
        <p className="text-center text-sm font-semibold tracking-wide text-brand-400 uppercase">
          Trusted by teams across telecom, industry & government
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-16 items-center justify-center rounded-lg border border-white/10 bg-brand-950 px-3 text-center"
            >
              {client.logo ? (
                <Image
                  src={urlForImage(client.logo).width(160).height(64).fit("max").url()}
                  alt={client.name}
                  width={120}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-xs font-semibold text-brand-300">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
