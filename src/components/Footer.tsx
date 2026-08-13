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
              <a
                href="https://www.linkedin.com/company/avm-healthcare"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/avm.healthcare.5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#E2E8F0] bg-white flex items-center justify-center text-[#475569] hover:bg-[#0A1628] hover:border-[#0A1628] hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z" />
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
