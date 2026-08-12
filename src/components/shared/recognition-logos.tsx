import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { Container } from "@/components/ui/container";
import { urlForImage } from "@/sanity/image";

interface RecognitionItem {
  name: string;
  url?: string;
  logo: SanityImage;
}

export function RecognitionLogos({ items }: { items: RecognitionItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-brand-950 py-20">
      <Container>
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="text-accent-400">Recognised</span>{" "}
          <span className="text-white">and Supported By</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item) => {
            const logo = (
              <div className="flex h-28 items-center justify-center rounded-xl bg-white p-5">
                <Image
                  src={urlForImage(item.logo).width(240).height(160).fit("max").url()}
                  alt={item.name}
                  width={180}
                  height={110}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            );
            return item.url ? (
              <a key={item.name} href={item.url} target="_blank" rel="noreferrer">
                {logo}
              </a>
            ) : (
              <div key={item.name}>{logo}</div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
