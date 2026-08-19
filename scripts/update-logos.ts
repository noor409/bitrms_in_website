/**
 * One-off follow-up to add-real-logos.ts: the user sent cleaner versions of
 * several logos plus two previously-missing ones (Forschungszentrum Jülich,
 * MSME) and a distinct "amrita tbi" mark (separate from the red Amrita
 * Vishwa Vidyapeetham university seal, which stays as-is). Patches the
 * existing clientLogo/recognition documents' logo fields in place rather
 * than creating duplicates.
 *
 * Requires SANITY_API_TOKEN (Editor access) in .env.local.
 *
 * Run with: npm run update-logos
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

async function patchLogoByName(type: "clientLogo" | "recognition", name: string, logoFile: string) {
  const doc = await client.fetch<{ _id: string } | null>(
    `*[_type == $type && name == $name][0]{_id}`,
    { type, name }
  );
  if (!doc) {
    console.warn(`No ${type} document found named "${name}" — skipping.`);
    return;
  }
  const logo = await uploadImage(logoFile);
  await client.patch(doc._id).set({ logo }).commit();
  console.log(`Updated ${type}: ${name}`);
}

async function run() {
  console.log(`Updating logos in dataset "${dataset}"...`);

  // The stripped-background version was illegible in the light theme (white
  // wordmark on a near-white card) — laoooddoo's badge background is part of
  // its actual brand mark, so restore the original instead of keying it out.
  await patchLogoByName("clientLogo", "Lao PDR Tax Service Department", "clients/lao-pdr-tax-service.png");

  const kolao = await client.fetch<{ _id: string } | null>(
    `*[_type == "clientLogo" && name == "KOLAO Group"][0]{_id}`
  );
  if (!kolao) {
    const logo = await uploadImage("clients/kolao-group.jpg");
    await client.create({ _type: "clientLogo", name: "KOLAO Group", category: "Client", order: 6, logo });
    console.log("Created Client: KOLAO Group");
  }

  console.log("Done.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
