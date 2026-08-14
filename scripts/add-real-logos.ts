/**
 * One-off script: uploads real client/partner/recognition logos (provided
 * directly by the user, saved under scripts/assets/) as Sanity image assets
 * and creates the corresponding documents. Unlike seed.ts, this is real
 * factual content (actual clients, actual partners), not placeholder data —
 * see seed.ts's comment for why that distinction matters.
 *
 * Requires SANITY_API_TOKEN (Editor access) in .env.local.
 *
 * Run with: npm run add-real-logos
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local — see README for setup steps."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const assetsDir = path.join(__dirname, "assets");

async function uploadImage(relativePath: string) {
  const filePath = path.join(assetsDir, relativePath);
  const stream = fs.createReadStream(filePath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(filePath),
  });
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

interface ClientPartnerEntry {
  name: string;
  url?: string;
  category: "Client" | "Partner";
  logoFile?: string;
  order: number;
}

const clients: ClientPartnerEntry[] = [
  {
    name: "Lao PDR Tax Service Department",
    url: "https://taxservice.mof.gov.la/websquare/websquare.do",
    category: "Client",
    logoFile: "clients/lao-pdr-tax-service.jpg",
    order: 1,
  },
  {
    name: "Yoma Micro Power",
    url: "https://yomamicropower.com/",
    category: "Client",
    logoFile: "clients/yoma-micro-power.svg",
    order: 2,
  },
  {
    name: "Micro Power Philippines",
    url: "https://micropowerph.com/",
    category: "Client",
    logoFile: "clients/micro-power-philippines.webp",
    order: 3,
  },
  {
    name: "IGSTC",
    category: "Client",
    logoFile: "clients/igstc.jpg",
    order: 4,
  },
  {
    name: "Zillion Towers",
    category: "Client",
    logoFile: "clients/zillion-towers.webp",
    order: 5,
  },
  {
    name: "Forschungszentrum Jülich",
    url: "https://www.fz-juelich.de/en",
    category: "Partner",
    order: 6,
  },
  {
    name: "Amrita TBI",
    url: "https://www.amritatbi.com/",
    category: "Partner",
    logoFile: "partners/amrita.svg",
    order: 7,
  },
  {
    name: "Amrita Vishwa Vidyapeetham",
    url: "https://www.amrita.edu/",
    category: "Partner",
    logoFile: "partners/amrita.svg",
    order: 8,
  },
  {
    name: "Heliopas.ai",
    category: "Partner",
    logoFile: "partners/heliopas-ai.png",
    order: 9,
  },
  {
    name: "Start in UP",
    category: "Partner",
    logoFile: "partners/start-in-up.jpg",
    order: 10,
  },
];

const recognitions = [
  { name: "Start in UP", logoFile: "recognition/start-in-up.jpg", order: 1 },
  { name: "Startup India", logoFile: "recognition/startup-india-dpiit.jpg", order: 2 },
  { name: "Amrita TBI", logoFile: "recognition/amrita-tbi.svg", order: 3 },
];

async function run() {
  console.log(`Adding real logos to dataset "${dataset}"...`);

  for (const entry of clients) {
    const logo = entry.logoFile ? await uploadImage(entry.logoFile) : undefined;
    await client.create({
      _type: "clientLogo",
      name: entry.name,
      url: entry.url,
      category: entry.category,
      order: entry.order,
      ...(logo ? { logo } : {}),
    });
    console.log(`Created ${entry.category}: ${entry.name}`);
  }

  for (const entry of recognitions) {
    const logo = await uploadImage(entry.logoFile);
    await client.create({
      _type: "recognition",
      name: entry.name,
      order: entry.order,
      logo,
    });
    console.log(`Created Recognition: ${entry.name}`);
  }

  console.log(
    "Done. MSME logo was not provided — add it via /studio when you have the file, along with the Zillion Towers / IGSTC website URLs if you have them."
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
