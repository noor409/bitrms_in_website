/**
 * Seeds the connected Sanity dataset with legitimate structural content —
 * the 5 real service lines, site settings, and blog posts. Deliberately does
 * NOT seed testimonials, certifications, client logos, projects, or job
 * openings: those are specific factual claims (who said what, what's
 * certified, which clients, which roles are open) that must come from real
 * data entered through /studio, not invented placeholders.
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 * SANITY_API_TOKEN (a token with Editor access) in .env.local.
 *
 * Run with: npm run seed
 */
import "dotenv/config";
import { createClient } from "@sanity/client";
import { services } from "../src/lib/content/services";
import { posts } from "../src/lib/content/posts";
import { siteSettings, stats, missionVisionValues } from "../src/lib/content/site";

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

async function seed() {
  console.log(`Seeding dataset "${dataset}"...`);

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: siteSettings.companyName,
    tagline: siteSettings.tagline,
    email: siteSettings.email,
    phone: siteSettings.phone,
    address: siteSettings.address,
    linkedin: siteSettings.linkedin,
  });

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroKicker: "Engineering Across Five Critical Domains",
    heroTitle: "Engineering a Smarter, Safer, Cleaner Future",
    heroSubtitle:
      "BITRMS delivers green hydrogen, cyber security, enterprise automation, and telecom infrastructure solutions engineered for reliability and long-term partnership.",
    stats: stats.map((s) => ({ value: s.value, label: s.label })),
  });

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    mission: missionVisionValues.mission,
    vision: missionVisionValues.vision,
    values: missionVisionValues.values,
  });

  for (const service of services) {
    await client.createOrReplace({
      _id: `service.${service.slug}`,
      _type: "service",
      title: service.title,
      shortTitle: service.shortTitle,
      slug: { _type: "slug", current: service.slug },
      icon: service.icon,
      heroKicker: service.heroKicker,
      summary: service.summary,
      features: service.features,
      benefits: service.benefits,
      body: service.body.map((paragraph) => ({
        _type: "block",
        _key: cryptoKey(),
        style: "normal",
        children: [{ _type: "span", _key: cryptoKey(), text: paragraph }],
      })),
      order: services.indexOf(service),
    });
  }
  console.log(`Seeded ${services.length} services.`);

  for (const post of posts) {
    await client.createOrReplace({
      _id: `post.${post.slug}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedAt: new Date(post.publishedAt).toISOString(),
      body: post.body.map((paragraph) => ({
        _type: "block",
        _key: cryptoKey(),
        style: "normal",
        children: [{ _type: "span", _key: cryptoKey(), text: paragraph }],
      })),
    });
  }
  console.log(`Seeded ${posts.length} blog posts.`);

  console.log(
    "Done. Open /studio to add real projects, testimonials, certifications, client logos, and job openings — those are intentionally not seeded."
  );
}

function cryptoKey() {
  return Math.random().toString(36).slice(2, 10);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
