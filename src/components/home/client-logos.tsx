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
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex h-20 w-40 items-center justify-center rounded-lg border border-white/10 bg-brand-950 px-3 text-center sm:w-44"
          >
            {client.logo ? (
              <Image
                src={urlForImage(client.logo).height(160).fit("max").url()}
                alt={client.name}
                width={150}
                height={56}
                className="max-h-14 w-auto object-contain"
              />
            ) : (
              <span className="text-xs font-semibold text-brand-300">{client.name}</span>
            )}
          </div>
        ))}
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
