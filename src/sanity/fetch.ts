import { client } from "./client";
import { isSanityConfigured } from "./env";

/**
 * Fetches from Sanity when a project is connected, returning null on any
 * failure (not configured, network error, empty dataset) so callers can fall
 * back to the placeholder content in src/lib/content.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    return result ?? null;
  } catch {
    return null;
  }
}
