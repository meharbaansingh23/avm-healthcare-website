import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID ?? "4wgytumt";
const dataset = process.env.SANITY_DATASET ?? "production";

/**
 * Unauthenticated, CDN-backed Sanity client for reading published content.
 * No token: this only ever reads public, published documents, and useCdn
 * trades a short cache lag for much faster reads.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  useCdn: true,
});
