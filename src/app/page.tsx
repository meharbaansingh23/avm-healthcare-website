import HomeContent from "@/components/HomeContent";
import { getSiteSettings } from "@/lib/sanity-queries";

// Fallback for when siteSettings.certificationWording hasn't been set in
// Sanity yet. Sanity is the source of truth once populated — this only
// covers the gap before an editor fills it in via the Studio.
const DEFAULT_CERTIFICATION_WORDING =
  "CE, ISO and CDSCO (India's regulatory authority, equivalent to the FDA) certified. Quality is monitored at every stage of manufacturing, from raw material to final product.";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <HomeContent
      certificationWording={settings?.certificationWording || DEFAULT_CERTIFICATION_WORDING}
    />
  );
}
