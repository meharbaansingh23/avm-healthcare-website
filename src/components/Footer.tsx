import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/innovation", label: "Innovation" },
  { href: "/request-catalogue", label: "Request Catalogue" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link href="/" className="flex items-center">
            {/* TODO: Replace with real image */}
            <Image
              src="/images/logo-light.png"
              alt="AVM Healthcare"
              width={100}
              height={32}
              unoptimized
            />
          </Link>
          <nav className="flex flex-wrap gap-8">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/40 hover:text-white/60 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2026 AVM Healthcare Products Pvt. Ltd. · New Delhi, India
          </p>
          <p className="text-xs text-white/25">Powered by Resend</p>
        </div>
      </div>
    </footer>
  );
}
