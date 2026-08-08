export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-08";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// True once a real Sanity project has been connected (see README "Connect Sanity").
// Until then, pages render from the placeholder content in src/lib/content instead.
export const isSanityConfigured = projectId.length > 0;
