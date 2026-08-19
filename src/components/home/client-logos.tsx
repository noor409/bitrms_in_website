import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { Container } from "@/components/ui/container";
import { urlForImage } from "@/sanity/image";

export interface ClientLogoItem {
  name: string;
  url?: string;
  logo?: SanityImage;
  category?: "Client" | "Partner";
}

function LogoGrid({ clients, heading }: { clients: ClientLogoItem[]; heading: string }) {
  return (
    <div>
      <p className="text-center text-sm font-semibold tracking-wide text-brand-400 uppercase">
        {heading}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {clients.map((client) => {
          const card = (
            <div className="flex h-16 items-center justify-center rounded-lg border border-white/10 bg-brand-950 px-3 text-center">
              {client.logo ? (
                <Image
                  src={urlForImage(client.logo).height(128).fit("max").url()}
                  alt={client.name}
                  width={120}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                />
              ) : (
                <span className="text-xs font-semibold text-brand-300">{client.name}</span>
              )}
            </div>
          );
          return client.url ? (
            <a key={client.name} href={client.url} target="_blank" rel="noreferrer">
              {card}
            </a>
          ) : (
            <div key={client.name}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}

export function ClientLogos({
  clients,
  partners = [],
  clientsHeading = "Trusted by teams across telecom, industry & government",
  partnersHeading = "Our Partners",
}: {
  clients: ClientLogoItem[];
  partners?: ClientLogoItem[];
  clientsHeading?: string;
  partnersHeading?: string;
}) {
  if (clients.length === 0 && partners.length === 0) return null;

  return (
    <section className="bg-brand-900 py-16">
      <Container className="space-y-10">
        {clients.length > 0 && <LogoGrid clients={clients} heading={clientsHeading} />}
        {partners.length > 0 && <LogoGrid clients={partners} heading={partnersHeading} />}
      </Container>
    </section>
  );
}
