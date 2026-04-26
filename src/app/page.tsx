"use client";

import Link from "next/link";
import { useState } from "react";
import HeroSlideshow from "@/components/HeroSlideshow";
import { blogPosts } from "@/lib/blog";

const heroStats = [
  { value: "3,400+", label: "Products" },
  { value: "6", label: "Specialties" },
  { value: "36+", label: "Hospitals" },
  { value: "30+", label: "Years" },
];

const trustedBy = [
  "AIIMS Delhi",
  "Medanta",
  "Fortis",
  "Apollo",
  "KEM Hospital",
  "PGI Chandigarh",
  "GB Pant",
  "Lilavati",
  "Sir Ganga Ram",
];

const specialties = [
  {
    slug: "neurosurgical",
    name: "Neurosurgical",
    desc: "Instruments for cranial, spinal and micro-neurosurgical procedures — forceps, retractors, dissectors and more.",
    label: "Neurosurgical instruments",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    desc: "Core surgical instruments for operating theatres — clamps, scissors, needle holders, and tissue handling tools.",
    label: "General surgery tools",
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular",
    desc: "Precision devices for cardiac and vascular interventions — purpose-built for demanding procedures.",
    label: "Cardiovascular devices",
  },
  {
    slug: "gynaecology",
    name: "Gynaecology",
    desc: "Specialised instruments for women's health — designed for both routine and complex procedures.",
    label: "Gynaecology instruments",
  },
  {
    slug: "plastic-oral-surgery",
    name: "Plastic & Oral Surgery",
    desc: "Precision tools for reconstructive and oral surgical procedures — delicate instruments for exacting work.",
    label: "Plastic & oral instruments",
  },
  {
    slug: "containers-pads",
    name: "Containers & Pads",
    desc: "Sterile storage solutions and procedural support items for the modern operating theatre.",
    label: "Containers & pads",
  },
];

const whyStats = [
  { value: "10,000+", label: "Healthcare SKUs" },
  { value: "250+", label: "Institutions served" },
  { value: "98%", label: "On-time fulfilment" },
  { value: "30+", label: "Years active" },
];

const whyAvm = [
  {
    title: "Premium grade materials",
    desc: "Hardened non-rusting steel meeting the toughest requirements for elasticity, tenacity and corrosion resistance — instruments built to last.",
  },
  {
    title: "Surgeon-driven innovation",
    desc: "New products developed directly from surgeons' concepts and ideas, ensuring every instrument meets real operating theatre needs.",
  },
  {
    title: "Customisation on request",
    desc: "Products tailored to the specific requirements of individual users and institutions — from dimensions to materials.",
  },
  {
    title: "Global quality standards",
    desc: "CE, ISO and FDA certified. Quality monitored at every stage of manufacturing, from raw material to final product.",
  },
  {
    title: "24×7 service support",
    desc: "Round-the-clock service facility ensuring your instruments are always in optimal condition when you need them most.",
  },
  {
    title: "Continuously evolving range",
    desc: "Our catalogue is constantly updated to meet the dynamic and changing requirements of surgical users worldwide.",
  },
];

const certs = ["CE Certified", "ISO Certified", "FDA Compliant", "NSIC Registered"];

const groupCompanies = [
  {
    name: "AVM Healthcare Products",
    sub: "Parent company",
    href: null as string | null,
  },
  { name: "AVM Surgicare", sub: "Surgical solutions", href: null },
  {
    name: "ANI Instruments",
    sub: "German precision",
    href: "https://www.animedtec.com/",
  },
  { name: "Chaba Mediwise", sub: "Healthcare products", href: null },
];

const downloads = [
  {
    title: "Care & Maintenance Guide",
    desc: "Proper care and maintenance of surgical instruments.",
    href: "/downloads/Care and Maintenance of Surgical Instruments.pdf",
  },
  {
    title: "Certificate of Authenticity",
    desc: "Official certificate of authenticity for AVM products.",
    href: "/downloads/Certificate of Authenticity.pdf",
  },
  {
    title: "Warranty Certificate",
    desc: "Standard warranty certificate for AVM instruments.",
    href: "/downloads/Warranty Certificate.pdf",
  },
  {
    title: "Warranty by AVM",
    desc: "Complete warranty terms offered by AVM Healthcare.",
    href: "/downloads/Warranty offered by AVM.pdf",
  },
];

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
  );
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 min-h-[85vh] grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-4 py-1.5 text-xs font-semibold">
              <span className="block h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
              Surgical Instruments · Made in India · Since 1996
            </span>

            <h1
              className="text-5xl lg:text-6xl font-semibold text-[#0A1628] mt-6 leading-[1.05] tracking-[-0.04em]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Precision instruments for modern surgical care
            </h1>

            <p className="text-[#64748B] text-lg leading-relaxed max-w-md mt-5">
              AVM Healthcare Products supplies advanced surgical instruments
              to premier hospitals across India — from neurosurgery to
              cardiovascular care.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-8">
              <Link
                href="/request-catalogue"
                className="bg-[#0A1628] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors"
              >
                Request catalogue
              </Link>
              <a
                href="#story"
                className="text-[#64748B] px-5 py-3.5 text-sm hover:text-[#0A1628] transition-colors"
              >
                Watch our story →
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-[#E2E8F0] grid grid-cols-2 md:grid-cols-4 gap-8">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#0A1628] tabular-nums" style={{ letterSpacing: "-0.03em" }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase text-[#94A3B8] mt-1" style={{ letterSpacing: "0.15em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden">
            <HeroSlideshow />
          </div>
        </div>

        {/* Client strip */}
        <div className="border-t border-b border-[#E2E8F0] bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
            <span className="text-[10px] uppercase text-[#94A3B8] shrink-0" style={{ letterSpacing: "0.15em" }}>
              Trusted by
            </span>
            <span className="text-sm text-[#94A3B8]">
              {trustedBy.join(" · ")}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHO WE ARE */}
      <section id="story" className="bg-[#F5F5F3] py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-label">Who we are</p>
            <h2 className="text-4xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em] leading-tight" style={{ letterSpacing: "-0.03em" }}>
              Supplying surgical excellence since 1996
            </h2>
            <p className="text-[#64748B] mt-6 leading-relaxed">
              AVM Healthcare Products Pvt. Ltd. is a New Delhi–based
              manufacturer and supplier of advanced quality surgical
              instruments and medical devices. We design, develop, and supply
              instruments across neurosurgery, general surgery, cardiovascular,
              gynaecology, plastic surgery, and more — serving premier
              institutions including AIIMS, Medanta, Fortis, Apollo, and KEM
              Hospital.
            </p>
            <blockquote className="mt-8 border-l-4 border-blue-500 pl-5 italic text-lg text-[#0A1628] font-medium leading-relaxed">
              &ldquo;Our motto is to provide world-class instruments for the
              benefit of mankind.&rdquo;
            </blockquote>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-video shadow-lg border border-[#E2E8F0] bg-black">
            <iframe
              src="https://www.youtube.com/embed/_QNRNKJiNuA"
              title="AVM Healthcare — Our story"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* SECTION 3 — SURGICAL SPECIALTIES */}
      <section className="bg-white py-28">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="section-label">Our specialties</p>
          <h2 className="text-4xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]">
            Six disciplines, one commitment to quality
          </h2>
          <p className="text-[#64748B] mt-4 leading-relaxed">
            We supply precision instruments across six major surgical
            specialties — each category developed with direct input from
            practicing surgeons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-7xl mx-auto px-6">
          {specialties.map((s) => (
            <div
              key={s.slug}
              className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all duration-200"
            >
              {/* TODO: Replace with real specialty image */}
              <div className="img-placeholder w-full h-48 rounded-none">
                {s.label}
              </div>
              <div className="p-6">
                <h3 className="text-base font-semibold text-[#0A1628] leading-snug">
                  {s.name}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed mt-2">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — WHY CHOOSE AVM */}
      <section className="bg-[#F5F5F3] py-28">
        {/* Header row */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-16">
          <div>
            <p className="text-xs uppercase font-medium text-blue-600" style={{ letterSpacing: "0.12em" }}>
              Why choose AVM
            </p>
            <h2 className="text-4xl font-semibold text-[#0A1628] mt-3 max-w-sm leading-tight tracking-[-0.03em]">
              Built for the demands of modern surgery
            </h2>
          </div>
          <p className="text-[#64748B] text-base leading-relaxed max-w-lg mt-1">
            Every instrument we supply meets the highest standards of material
            quality, precision engineering, and surgical performance — because
            in the operating theatre, there is no margin for error.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-[#E2E8F0]">
          {whyStats.map((s) => (
            <div
              key={s.label}
              className="py-10 px-8 border-r border-[#E2E8F0] last:border-r-0"
            >
              <div className="font-semibold text-5xl text-[#0A1628] tracking-[-0.04em]">
                {s.value}
              </div>
              <div className="text-sm text-[#64748B] mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-16 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            {/* TODO: Replace with real product photography */}
            <div className="img-placeholder h-96 w-full rounded-2xl">
              Product / instruments image
            </div>
          </div>

          <div>
            {whyAvm.map((row, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={row.title}
                  className="border-b border-[#E2E8F0] py-5 cursor-pointer group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : i);
                    }
                  }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-semibold text-[#0A1628] group-hover:text-blue-600 transition-colors">
                      {row.title}
                    </h3>
                    <span
                      className="text-[#94A3B8] text-lg leading-none mt-0.5 shrink-0"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "200px" : "0px" }}
                  >
                    <p className="text-sm text-[#64748B] leading-relaxed mt-3">
                      {row.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CERTIFICATIONS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Certifications & compliance</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
              Built to the highest standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {certs.map((name) => (
              <div
                key={name}
                className="border border-[#E2E8F0] rounded-2xl p-8 text-center hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <CheckIcon className="mx-auto text-blue-600" />
                <div className="text-sm font-semibold text-[#0A1628] mt-4">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — REQUEST CATALOGUE CTA */}
      <section className="bg-[#F5F5F3] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label">Get started</p>
          <h2 className="text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
            Request our detailed product catalogue
          </h2>
          <p className="text-[#64748B] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Over 3,400 surgical instruments across 6 specialties. Our team
            will send the full catalogue to your inbox within one business
            day.
          </p>
          <Link
            href="/request-catalogue"
            className="inline-block mt-10 bg-[#0A1628] text-white px-10 py-4 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors"
          >
            Request full catalogue →
          </Link>
        </div>
      </section>

      {/* SECTION 7 — BLOG PREVIEW */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="section-label">AVM Insights</p>
              <h2 className="text-4xl md:text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
                From our knowledge base
              </h2>
              <p className="text-[#64748B] mt-4 leading-relaxed">
                Insights on surgical instrument care, innovation, and best
                practices.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors ml-auto"
            >
              View all articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {blogPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
              >
                {/* TODO: Replace with real cover image */}
                <div className="img-placeholder h-48 w-full rounded-none">
                  Blog cover image
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-blue-600 uppercase" style={{ letterSpacing: "0.15em" }}>
                    {p.category}
                  </p>
                  <h3 className="text-base font-semibold text-[#0A1628] mt-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mt-2 leading-relaxed flex-1">
                    {p.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-blue-600 mt-4 inline-flex items-center gap-1 transition-all hover:gap-2">
                    Read article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — GROUP OF COMPANIES */}
      <section className="bg-[#F5F5F3] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Our group</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
              Part of a larger family
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              AVM Healthcare is part of a group of companies committed to
              advancing surgical and medical care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {groupCompanies.map((c) => {
              const inner = (
                <>
                  {/* TODO: Replace with real logo */}
                  <div className="w-full h-14 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#CBD5E1] text-xs uppercase" style={{ letterSpacing: "0.15em" }}>
                    Logo
                  </div>
                  <div className="text-sm font-semibold text-[#0A1628] mt-5">
                    {c.name}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">{c.sub}</div>
                </>
              );
              const cardClass =
                "bg-white rounded-2xl border border-[#E2E8F0] p-8 hover:shadow-md hover:border-blue-200 transition-all";
              return c.href ? (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClass}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.name} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 9 — DOWNLOADS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Resources</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
              Product support documents
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              Download our warranty and care documentation for AVM surgical
              instruments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {downloads.map((d) => (
              <div
                key={d.title}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-7 hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
              >
                <div
                  className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 text-xs font-bold"
                  aria-hidden
                >
                  PDF
                </div>
                <h3 className="text-sm font-semibold text-[#0A1628] mt-5 leading-snug">
                  {d.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed flex-1">
                  {d.desc}
                </p>
                <a
                  href={d.href}
                  download
                  className="mt-6 text-blue-600 text-xs font-semibold hover:text-blue-700 inline-flex items-center gap-1 self-start transition-colors"
                >
                  Download ↓
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
