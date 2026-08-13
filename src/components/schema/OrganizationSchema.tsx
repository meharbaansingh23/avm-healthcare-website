import JsonLd from "./JsonLd";

export const BASE_URL = "https://avmhealthcare.com";

/**
 * Stable @id values so other schema blocks (BlogPosting, Breadcrumb, FAQ) can
 * reference this organisation rather than duplicating it on every page.
 */
export const ORG_ID = `${BASE_URL}/#organization`;
export const SITE_ID = `${BASE_URL}/#website`;

// ---------------------------------------------------------------------------
// TODO — confirm with Anil before deploying.
// Three different addresses for AVM are currently published across the web
// (Chhatarpur Enclave 110030, Chattarpur Extension 110074, Darya Ganj 110002).
// Schema carrying the wrong address is worse than no schema, so these must be
// the single canonical registered address and the number used on the Google
// Business Profile.
// ---------------------------------------------------------------------------
const STREET_ADDRESS = "REPLACE_ME";
const POSTAL_CODE = "REPLACE_ME";
const TELEPHONE = "REPLACE_ME"; // E.164, e.g. "+91-11-23255383"

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "AVM Healthcare Products Pvt. Ltd.",
  alternateName: "AVM Healthcare",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/logo-dark.png`,
  },
  image: `${BASE_URL}/opengraph-image.png`,
  description:
    "New Delhi-based manufacturer of surgical instruments for neurosurgery, general surgery, cardiovascular, gynaecology and reconstructive surgery, supplying hospitals and institutions in India and internationally since 1996.",
  foundingDate: "1996",
  email: "info@avmhealthcare.com",
  telephone: TELEPHONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: POSTAL_CODE,
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@avmhealthcare.com",
      telephone: TELEPHONE,
      areaServed: "Worldwide",
      availableLanguage: ["en", "hi"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/avm-healthcare",
    // TODO — two Facebook presences exist. Add the canonical one only.
  ],
  knowsAbout: [
    "Surgical instruments",
    "Neurosurgical instruments",
    "Cardiovascular surgical instruments",
    "Gynaecological instruments",
    "Surgical instrument manufacturing",
    "Surgical instrument reprocessing",
  ],
  // NOTE — certification claims are deliberately omitted until the certificate
  // scopes are confirmed. Machine-readable claims carry more weight than page
  // copy, so do not add `hasCredential` on the strength of the badge images.
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: BASE_URL,
  name: "AVM Healthcare",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-IN",
};

export default function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [organization, website],
      }}
    />
  );
}
