"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/innovation", label: "Innovation" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          {/* TODO: Replace with real image */}
          <Image
            src="/images/logo-dark.png"
            alt="AVM Healthcare"
            width={120}
            height={40}
            unoptimized
            preload
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-[#64748B] hover:text-[#0A1628] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/request-catalogue" className="btn-primary">
            Request Catalogue
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-[#0A1628] transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#0A1628] transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[#0A1628] transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#E2E8F0] bg-white">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[#64748B] hover:text-[#0A1628] py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/request-catalogue"
              className="btn-primary mt-3 text-center"
              onClick={() => setOpen(false)}
            >
              Request Catalogue
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
