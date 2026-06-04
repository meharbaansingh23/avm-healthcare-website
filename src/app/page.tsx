"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import GroupOfCompanies from "@/components/GroupOfCompanies";
import { blogPosts } from "@/lib/blog";

// PLACEHOLDER IMAGERY — to be replaced by client-provided photography.
// Real Unsplash CDN URL (verified). Dramatic, editorial operating-theatre shot
// chosen for the full-bleed hero so the dark left-gradient keeps text readable.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1920&q=80";

const specialties = [
  {
    slug: "neurosurgical",
    name: "Neurosurgical",
    desc: "Instruments for cranial, spinal and micro-neurosurgical procedures — forceps, retractors, dissectors and more.",
    label: "Neurosurgical instruments",
    img: "/images/categories/neuro.png",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    desc: "Core surgical instruments for operating theatres — clamps, scissors, needle holders, and tissue handling tools.",
    label: "General surgery tools",
    img: "/images/categories/general.png",
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular",
    desc: "Precision devices for cardiac and vascular interventions — purpose-built for demanding procedures.",
    label: "Cardiovascular devices",
    img: "/images/categories/cardio.png",
  },
  {
    slug: "gynaecology",
    name: "Gynaecology",
    desc: "Specialised instruments for women's health — designed for both routine and complex procedures.",
    label: "Gynaecology instruments",
    img: "/images/categories/gyno.png",
  },
  {
    slug: "plastic-oral-surgery",
    name: "Plastic & Oral Surgery",
    desc: "Precision tools for reconstructive and oral surgical procedures — delicate instruments for exacting work.",
    label: "Plastic & oral instruments",
    img: "/images/categories/oral.png",
  },
  {
    slug: "containers-pads",
    name: "Containers & Pads",
    desc: "Sterile storage solutions and procedural support items for the modern operating theatre.",
    label: "Containers & pads",
    img: "/images/categories/containers.png",
  },
];

const whyStats = [
  { key: "skus" as const, label: "Healthcare SKUs", target: 10000, suffix: "+", thousands: true },
  { key: "institutions" as const, label: "Institutions served", target: 250, suffix: "+" },
  { key: "fulfilment" as const, label: "On-time fulfilment", target: 100, suffix: "%" },
  { key: "years" as const, label: "Years active", target: 30, suffix: "+" },
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

const certs = [
  { name: "CE Certified", img: "/images/certifications/ce.png" },
  { name: "ISO Certified", img: "/images/certifications/iso.png" },
  { name: "FDA Compliant", img: "/images/certifications/fda.png" },
  { name: "NSIC Registered", img: "/images/certifications/nsic.png" },
];

// Product support documents — the "Warranty Certificate" PDF (previously 3rd)
// has been removed per the redesign brief. Three documents remain.
const downloads = [
  {
    title: "Care & Maintenance Guide",
    desc: "Proper care and maintenance of surgical instruments.",
    href: "/downloads/Care%20and%20Maintenance%20of%20Surgical%20Instruments.pdf",
  },
  {
    title: "Certificate of Authenticity",
    desc: "Official certificate of authenticity for AVM products.",
    href: "/downloads/Certificate%20of%20Authenticity.pdf",
  },
  {
    title: "Warranty by AVM",
    desc: "Complete warranty terms offered by AVM Healthcare.",
    href: "/downloads/Warranty%20offered%20by%20AVM.pdf",
  },
];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [counts, setCounts] = useState({ skus: 0, institutions: 0, fulfilment: 0, years: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) {
          setCounts({ skus: 10000, institutions: 250, fulfilment: 100, years: 30 });
          return;
        }

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const ease = 1 - Math.pow(1 - progress, 3);
          setCounts({
            skus: Math.floor(ease * 10000),
            institutions: Math.floor(ease * 250),
            fulfilment: Math.floor(ease * 100),
            years: Math.floor(ease * 30),
          });
          if (step >= steps) clearInterval(timer);
        }, interval);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── SECTION 1 — FULL-BLEED HERO (left-aligned: the one exception) ─── */}
      <section className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden bg-[#0A1628]">
        {/* PLACEHOLDER — client to replace with AVM-specific operating-theatre photography */}
        <Image
          src={HERO_IMAGE}
          alt="Surgical team operating in a modern operating theatre"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* Dark gradient overlay — keeps left-aligned text readable */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.6) 50%, rgba(10,22,40,0.4) 100%)",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-24">
          <div className="max-w-[600px] text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xs uppercase font-medium text-[#DBEAFE]"
              style={{ letterSpacing: "0.2em" }}
            >
              Surgical Instruments · Made in India · Since 1996
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="display-heading text-white text-6xl md:text-8xl mt-6"
            >
              Precision instruments for modern surgical care
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-white/90 text-lg leading-relaxed mt-7"
            >
              AVM Healthcare Products supplies advanced surgical instruments to
              premier hospitals across India — from neurosurgery to
              cardiovascular care.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mt-9"
            >
              <Link
                href="/request-catalogue"
                className="inline-flex items-center gap-2 bg-white text-[#0A1628] px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Request catalogue
                <ArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — animated chevron */}
        <motion.div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </section>

      {/* ─── SECTION 2 — QUOTE STRIP ─── */}
      <section className="bg-white py-20 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-[800px] mx-auto text-center">
          <div className="w-12 h-px bg-blue-600 mx-auto" />
          <blockquote className="display-heading text-[#0A1628] text-3xl md:text-4xl italic mt-8 leading-snug">
            &ldquo;Our motto is to provide world-class instruments for the
            benefit of mankind.&rdquo;
          </blockquote>
          <p
            className="text-xs uppercase font-medium text-[#94A3B8] mt-8"
            style={{ letterSpacing: "0.2em" }}
          >
            — Anil Chaba · Director
          </p>
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 3 — WHO WE ARE (centered, no video) ─── */}
      <section id="story" className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-[700px] mx-auto text-center">
          <p className="section-label">Who we are</p>
          <h2 className="section-heading mt-4">
            Supplying surgical excellence since 1996
          </h2>
          <p className="text-[#475569] mt-6 leading-relaxed">
            AVM Healthcare Products Pvt. Ltd. is a New Delhi–based manufacturer
            and supplier of advanced quality surgical instruments and medical
            devices. We design, develop, and supply instruments across
            neurosurgery, general surgery, cardiovascular, gynaecology, plastic
            surgery, and more.
          </p>
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 4 — SURGICAL SPECIALTIES ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Our specialties</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              Six disciplines, one commitment to quality
            </h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              We supply precision instruments across six major surgical
              specialties — each category developed with direct input from
              practicing surgeons.
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {specialties.map((s, i) => (
              <FadeInWhenVisible key={s.slug} delay={(i % 3) * 0.1} className="h-full">
                <div className="h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                  <div className="w-full h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.img}
                      alt={s.label}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-base font-semibold text-[#0A1628] leading-snug">
                      {s.name}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed mt-2">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 — WHY CHOOSE AVM (showcase) ─── */}
      {/* Soft blue gradient background (per design system). Green active accent on accordion. */}
      <section
        className="py-24 md:py-32 px-6 md:px-8"
        style={{ background: "linear-gradient(180deg, #DBEAFE 0%, #EFF6FF 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-[700px] mx-auto">
            <p className="section-label">Why choose AVM</p>
            <h2 className="display-heading text-[#0A1628] text-6xl md:text-8xl mt-4">
              Built for the demands of modern surgery
            </h2>
            <p className="text-[#475569] text-lg mt-6 leading-relaxed">
              Every instrument we supply meets the highest standards of material
              quality, precision engineering, and surgical performance — because
              in the operating theatre, there is no margin for error.
            </p>
          </FadeInWhenVisible>

          {/* Stats card */}
          <FadeInWhenVisible delay={0.1} className="mt-16">
            <div
              ref={statsRef}
              className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm grid grid-cols-2 md:grid-cols-4 overflow-hidden"
            >
              {whyStats.map((stat, i) => {
                const value = counts[stat.key];
                const display = stat.thousands ? value.toLocaleString() : value;
                return (
                  <div
                    key={stat.key}
                    className={`py-10 px-8 flex flex-col justify-center items-center text-center ${
                      i >= 2 ? "border-t border-[#E2E8F0] md:border-t-0" : ""
                    } ${i > 0 ? "md:border-l md:border-[#E2E8F0]" : ""}`}
                  >
                    <div className="font-bold text-4xl text-[#0A1628] tracking-[-0.04em] tabular-nums">
                      {display}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-[#475569] mt-2">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </FadeInWhenVisible>

          {/* Accordion — centered single column, framer-motion expand, green active state */}
          <FadeInWhenVisible delay={0.15} className="mt-12 max-w-[800px] mx-auto flex flex-col gap-3">
            {whyAvm.map((row, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={row.title}
                  className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                    isOpen
                      ? "border-[#059669] bg-[#ECFDF5]"
                      : "border-[#E2E8F0] bg-white hover:border-blue-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center gap-6 text-left px-6 py-5 cursor-pointer"
                  >
                    <h3
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-[#059669]" : "text-[#0A1628]"
                      }`}
                    >
                      {row.title}
                    </h3>
                    <span
                      className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-[#059669]" : "text-[#94A3B8]"
                      }`}
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <p className="text-sm text-[#475569] leading-relaxed px-6 pb-5">
                          {row.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 6 — CERTIFICATIONS ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Certifications &amp; compliance</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              Built to the highest standards
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {certs.map((c, i) => (
              <FadeInWhenVisible key={c.name} delay={i * 0.1} className="h-full">
                <div className="h-full border border-[#E2E8F0] rounded-xl p-8 bg-white flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{ height: "60px", width: "auto", objectFit: "contain", display: "block" }}
                  />
                  <div className="text-sm font-semibold text-[#0A1628]">{c.name}</div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7 — CATALOGUE CTA (navy, dramatic, subtle green accent) ─── */}
      <section className="bg-[#0A1628] py-28 md:py-36 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-3xl mx-auto text-center">
          {/* Subtle green accent line — secondary nod to the green palette */}
          <div className="w-12 h-px bg-[#059669] mx-auto" />
          <p
            className="text-xs uppercase font-medium text-[#DBEAFE] mt-8"
            style={{ letterSpacing: "0.2em" }}
          >
            Get started
          </p>
          <h2 className="display-heading text-white text-5xl md:text-7xl mt-5">
            Request our detailed product catalogue
          </h2>
          <p className="text-white/80 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Over 3,400 surgical instruments across 6 specialties. Our team will
            send the full catalogue to your inbox within one business day.
          </p>
          <Link
            href="/request-catalogue"
            className="inline-flex items-center gap-2 mt-10 bg-white text-[#0A1628] px-9 py-4 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Request full catalogue
            <ArrowRight />
          </Link>
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 8 — BLOG PREVIEW (centered) ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">AVM Insights</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              From our knowledge base
            </h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              Insights on surgical instrument care, innovation, and best
              practices.
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {blogPosts.map((p, i) => (
              <FadeInWhenVisible key={p.slug} delay={i * 0.1} className="h-full">
                <Link
                  href={`/blog/${p.slug}`}
                  className="h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200 flex flex-col"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 text-center">
                    <p
                      className="text-xs font-medium text-blue-600 uppercase"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      {p.category}
                    </p>
                    <h3 className="text-base font-semibold text-[#0A1628] mt-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#475569] mt-2 leading-relaxed flex-1">
                      {p.excerpt}
                    </p>
                    <span className="text-xs font-semibold text-blue-600 mt-4 inline-flex items-center justify-center gap-1">
                      Read article →
                    </span>
                  </div>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={0.2} className="text-center mt-12">
            <Link
              href="/blog"
              className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
            >
              View all articles →
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 9 — GROUP OF COMPANIES ─── */}
      <GroupOfCompanies />

      {/* ─── SECTION 10 — DOWNLOADS (3 documents) ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Resources</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              Product support documents
            </h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              Download our warranty and care documentation for AVM surgical
              instruments.
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {downloads.map((d, i) => (
              <FadeInWhenVisible key={d.title} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white rounded-2xl border border-[#E2E8F0] p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200 flex flex-col items-center text-center">
                  <div
                    className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold"
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
                    className="mt-6 text-blue-600 text-xs font-semibold hover:text-blue-700 inline-flex items-center gap-1 transition-colors"
                  >
                    Download ↓
                  </a>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
