import Image from "next/image";
import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          <Link href="/" className="flex items-center shrink-0">
            {/* TODO: Replace with real image */}
            <Image
              src="/images/logo-dark.png"
              alt="AVM Healthcare"
              width={120}
              height={40}
              unoptimized
            />
          </Link>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold text-[#0A1628] uppercase mb-4" style={{ letterSpacing: "0.15em" }}>
                  {col.heading}
                </h3>
                {col.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block mb-2 text-sm text-[#64748B] hover:text-[#0A1628] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
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
