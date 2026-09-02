import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID ?? "4wgytumt";
const dataset = process.env.SANITY_DATASET ?? "production";

/**
 * Server-only, token-authenticated Sanity client for writing form
 * submissions. If SANITY_API_TOKEN is unset, writes will fail with an auth
 * error at request time rather than at import time — callers are expected to
 * treat this as best-effort and catch the failure themselves.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-10-01",
  useCdn: false,
});
