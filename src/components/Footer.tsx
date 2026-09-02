import Link from "next/link";
import { getSiteSettings } from "@/lib/sanity-queries";

// Fallback for when siteSettings.whatsappNumber hasn't been set in Sanity
// yet, same pattern as the certificationWording fallback on the homepage.
const DEFAULT_WHATSAPP_NUMBER = "919810345155";

// Editorial links, not core contact info — no fallback URLs. Each icon only
// renders once a matching platform exists in siteSettings.socialLinks.
// Canonical order is fixed here rather than left to Studio entry order.
const SOCIAL_ICONS: Array<{ platform: string; label: string; svgPath: string }> = [
  {
    platform: "LinkedIn",
    label: "LinkedIn",
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    platform: "Facebook",
    label: "Facebook",
    svgPath:
      "M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z",
  },
  {
    platform: "Instagram",
    label: "Instagram",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

const footerColumns: Array<{
  heading: string;
  links: Array<{ href: string; label: string }>;
}> = [
  {
    heading: "Company",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "/request-catalogue", label: "Request Catalogue" },
      { href: "/innovation", label: "Innovation" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export default async function Footer() {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  const socialLinks: Array<{ platform: string; label: string; svgPath: string; url: string }> =
    SOCIAL_ICONS.flatMap((icon) => {
      const url = settings?.socialLinks?.find((link) => link.platform === icon.platform)?.url;
      return url ? [{ ...icon, url }] : [];
    });

  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/">
              <img
                src="/images/logo-dark.png"
                alt="AVM Healthcare Products"
                style={{ height: '32px', width: 'auto', display: 'block' }}
              />
            </a>

            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={social.svgPath} />
                  </svg>
                </a>
              ))}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.15 8.15 0 0 1-1.25-4.38c0-4.51 3.67-8.18 8.19-8.18 2.19 0 4.24.85 5.79 2.41a8.13 8.13 0 0 1 2.4 5.78c0 4.51-3.68 8.23-8.14 8.23zm4.48-6.13c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold text-[#0A1628] uppercase mb-4" style={{ letterSpacing: "0.15em" }}>
                  {col.heading}
                </h3>
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block mb-2 text-sm text-[#475569] hover:text-[#0A1628] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}

            <div>
              <h3 className="text-xs font-semibold text-[#0A1628] uppercase mb-4" style={{ letterSpacing: "0.15em" }}>
                Contact
              </h3>
              <p className="mb-2 text-sm text-[#475569] leading-relaxed">
                17-19 A Block, Chatarpur Extension, Rajpur Road, New Delhi —
                110074, India
              </p>
              <a
                href="tel:+919810345155"
                className="block mb-2 text-sm text-[#475569] hover:text-[#0A1628] transition-colors"
              >
                +91 98103 45155
              </a>
              <a
                href="mailto:sales@avmhealthcare.com"
                className="block mb-2 text-sm text-[#475569] hover:text-[#0A1628] transition-colors"
              >
                sales@avmhealthcare.com
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 text-sm text-[#475569] hover:text-[#0A1628] transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] mt-12 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]">
            © 2026 AVM Healthcare Products Pvt. Ltd. · New Delhi, India
          </p>
          <p className="text-xs text-[#94A3B8]">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
