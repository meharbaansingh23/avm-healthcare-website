"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import Marquee from "@/components/Marquee";
import HeroSlideshow from "@/components/HeroSlideshow";
import ImageCarousel, { type CarouselImage } from "@/components/ImageCarousel";
import AnimatedCounter from "@/components/AnimatedCounter";
import GroupOfCompanies from "@/components/GroupOfCompanies";
import { blogPosts } from "@/lib/blog";

// "Crafted With Precision" carousel — client product / scene photography.
// Dimensions are the natural source sizes so each card keeps its true ratio.
const craftGallery: CarouselImage[] = [
  { src: "/images/why-choose-avm.webp", alt: "Surgical instruments arranged on a dark display surface", width: 1504, height: 1003 },
  { src: "/images/gallery-neurosurgical.webp", alt: "Neurosurgical instrument set", width: 1500, height: 1000 },
  { src: "/images/gallery-kerrison.webp", alt: "Kerrison rongeur, close detail", width: 1733, height: 754 },
  { src: "/images/gallery-trident.webp", alt: "Trident surgical instrument detail", width: 1924, height: 1084 },
  { src: "/images/gallery-tray-instruments.webp", alt: "Surgical tray laid with instruments", width: 1504, height: 1004 },
  { src: "/images/gallery-instruments-array.webp", alt: "An array of polished surgical instruments", width: 6000, height: 3594 },
  { src: "/images/gallery-tray-1.webp", alt: "Sterilisation tray with surgical instruments", width: 1503, height: 1003 },
  { src: "/images/gallery-tray-2.webp", alt: "Surgical instrument tray, alternate view", width: 1503, height: 1003 },
  { src: "/images/gallery-tray-3.webp", alt: "Surgical instrument tray, detail view", width: 1503, height: 1003 },
  { src: "/images/gallery-gynaecology.webp", alt: "Gynaecology surgical instruments", width: 973, height: 949 },
];

const specialties = [
  {
    slug: "neurosurgical",
    name: "Neurosurgical",
    desc: "Cranial, spinal and micro-neurosurgical instruments.",
    label: "Neurosurgical instruments",
    img: "/images/neurosurgical.webp",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    desc: "Core instruments for the operating theatre.",
    label: "General surgery tools",
    img: "/images/general-surgery.webp",
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular",
    desc: "Precision devices for cardiac and vascular work.",
    label: "Cardiovascular devices",
    img: "/images/cardiovascular.webp",
  },
  {
    slug: "gynaecology",
    name: "Gynaecology",
    desc: "Specialised instruments for women's health.",
    label: "Gynaecology instruments",
    img: "/images/gynaecology.webp",
  },
  {
    slug: "plastic-oral-surgery",
    name: "Plastic & Oral Surgery",
    desc: "Delicate tools for reconstructive and oral surgery.",
    label: "Plastic & oral instruments",
    img: "/images/plastic-oral.webp",
  },
  {
    slug: "containers-pads",
    name: "Containers & Pads",
    desc: "Sterile storage and procedural support items.",
    label: "Containers & pads",
    img: "/images/containers-pads.webp",
  },
];

const whyStats = [
  { key: "skus", label: "Healthcare SKUs", target: 10000, suffix: "+", thousands: true },
  { key: "institutions", label: "Institutions Served", target: 250, suffix: "+", thousands: false },
  { key: "fulfilment", label: "On-Time Fulfilment", target: 100, suffix: "%", thousands: false },
  { key: "years", label: "Years Active", target: 30, suffix: "+", thousands: false },
];

const whyAvm = [
  {
    title: "Premium Grade Materials",
    desc: "Hardened non-rusting steel meeting the toughest requirements for elasticity, tenacity and corrosion resistance — instruments built to last.",
  },
  {
    title: "Surgeon-Driven Innovation",
    desc: "New products developed directly from surgeons' concepts and ideas, ensuring every instrument meets real operating theatre needs.",
  },
  {
    title: "Customisation On Request",
    desc: "Products tailored to the specific requirements of individual users and institutions — from dimensions to materials.",
  },
  {
    title: "Global Quality Standards",
    desc: "CE, ISO and FDA certified. Quality monitored at every stage of manufacturing, from raw material to final product.",
  },
  {
    title: "24×7 Service Support",
    desc: "Round-the-clock service facility ensuring your instruments are always in optimal condition when you need them most.",
  },
  {
    title: "Continuously Evolving Range",
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
    title: "Certificate Of Authenticity",
    desc: "Official certificate of authenticity for AVM products.",
    href: "/downloads/Certificate%20of%20Authenticity.pdf",
  },
  {
    title: "Warranty By AVM",
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

// Specialty card used inside the infinite marquee row.
function SpecialtyCard({ s }: { s: (typeof specialties)[number] }) {
  return (
    <div className="group/card h-full w-[300px] sm:w-[340px] flex flex-col bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:border-blue-200 hover:shadow-xl">
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.img}
          alt={s.label}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>
      <div className="p-6 text-center flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-[#0A1628] tracking-tight">
          {s.name}
        </h3>
        <p className="text-sm text-[#475569] mt-2 leading-relaxed">{s.desc}</p>
      </div>
    </div>
  );
}

// One of the stacked cards in the sticky Why-Choose section. A 2px blue bar
// wipes down the left edge as the card scrolls into view.
function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-sm p-8 pl-10 text-left overflow-hidden"
    >
      <motion.span
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 origin-top"
      />
      <h3 className="text-xl md:text-2xl font-bold text-[#0A1628] tracking-tight">
        {title}
      </h3>
      <p className="text-[#475569] leading-relaxed mt-3">{desc}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* ─── SECTION 1 — FULL-BLEED HERO (left-aligned: the one exception) ─── */}
      <section className="relative min-h-[calc(100svh-4rem)] flex items-center overflow-hidden bg-[#0A1628]">
        {/* Crossfading 3-slide background slideshow (text overlay stays constant) */}
        <HeroSlideshow />

        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 md:px-8 lg:px-12 py-24">
          <div className="max-w-[640px] text-left">
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
              className="text-white text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] mt-6"
            >
              Precision Instruments For Modern Surgical Care
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
      </section>

      {/* ─── SECTION 2 — QUOTE STRIP ─── */}
      <section className="bg-white py-24 px-6 md:px-8">
        <div className="max-w-[860px] mx-auto text-center">
          <div className="w-12 h-px bg-blue-600 mx-auto" />
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="display-heading text-[#0A1628] text-3xl md:text-5xl italic mt-8 leading-tight"
          >
            &ldquo;Our motto is to provide world-class instruments for the
            benefit of mankind.&rdquo;
          </motion.blockquote>
          <p
            className="text-xs uppercase font-medium text-[#94A3B8] mt-8"
            style={{ letterSpacing: "0.2em" }}
          >
            — Anil Chaba · Director
          </p>
        </div>
      </section>

      {/* ─── SECTION 3 — WHO WE ARE (centered) ─── */}
      <section id="story" className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-[760px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-blue-600" aria-hidden />
            <p className="section-label">Who We Are</p>
            <span className="w-8 h-px bg-blue-600" aria-hidden />
          </div>
          <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-5">
            Supplying Surgical Excellence Since 1996
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

      {/* ─── SECTION 4 — SPECIALTIES MARQUEE ─── */}
      <section className="bg-white py-20 md:py-28 overflow-hidden">
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto px-6 md:px-8">
          <p className="section-label">Our Specialties</p>
          <h2 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-4">
            Six Disciplines, One Commitment To Quality
          </h2>
          <p className="text-[#475569] mt-5 leading-relaxed">
            We supply precision instruments across six major surgical
            specialties — each category developed with direct input from
            practicing surgeons.
          </p>
        </FadeInWhenVisible>

        <div className="mt-16">
          <Marquee
            durationSec={36}
            items={specialties.map((s) => (
              <SpecialtyCard key={s.slug} s={s} />
            ))}
          />
        </div>
      </section>

      {/* ─── SECTION 4.5 — CRAFTED WITH PRECISION (image gallery carousel) ─── */}
      <section className="bg-white py-24 md:py-32 overflow-hidden">
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto px-6 md:px-8">
          <p
            className="text-xs uppercase font-medium text-[#2563EB]"
            style={{ letterSpacing: "0.2em" }}
          >
            Our Craft
          </p>
          <h2 className="text-[#0A1628] text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mt-4">
            Crafted With Precision
          </h2>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed mt-5 max-w-[600px] mx-auto">
            Every instrument tells a story of meticulous engineering and surgical
            heritage.
          </p>
        </FadeInWhenVisible>

        <div className="mt-16">
          <ImageCarousel images={craftGallery} speedSeconds={60} fadeColor="#FFFFFF" />
        </div>
      </section>

      {/* ─── SECTION 5 — WHY CHOOSE AVM (sticky scroll showcase) ─── */}
      {/* Soft blue gradient background + subtle grain overlay. */}
      <section
        className="relative py-24 md:py-32 px-6 md:px-8 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #DBEAFE 0%, #EFF6FF 100%)" }}
      >
        <div className="noise-overlay" aria-hidden />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT — sticky headline + stats */}
          <div className="lg:sticky lg:top-28 self-start text-center lg:text-left">
            <p className="section-label">Why Choose AVM</p>
            <h2 className="text-[#0A1628] text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] mt-4">
              Built For The Demands Of Modern Surgery
            </h2>
            <p className="text-[#475569] text-lg mt-6 leading-relaxed max-w-md mx-auto lg:mx-0">
              Every instrument we supply meets the highest standards of material
              quality, precision engineering, and surgical performance — because
              in the operating theatre, there is no margin for error.
            </p>

            {/* Stats card */}
            <div className="mt-10 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm grid grid-cols-2 overflow-hidden">
              {whyStats.map((stat, i) => (
                <div
                  key={stat.key}
                  className={`py-8 px-6 flex flex-col justify-center items-center text-center ${
                    i % 2 === 1 ? "border-l border-[#E2E8F0]" : ""
                  } ${i >= 2 ? "border-t border-[#E2E8F0]" : ""}`}
                >
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    thousands={stat.thousands}
                    durationMs={2000}
                    className="font-bold text-4xl text-[#0A1628] tracking-[-0.04em] tabular-nums"
                  />
                  <div className="text-sm text-[#475569] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — scrolling stacked cards */}
          <div className="flex flex-col gap-5">
            {whyAvm.map((row) => (
              <WhyCard key={row.title} title={row.title} desc={row.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 — CERTIFICATIONS ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Certifications &amp; Compliance</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-4">
              Built To The Highest Standards
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {certs.map((c, i) => (
              <FadeInWhenVisible key={c.name} delay={i * 0.1} className="h-full">
                <div className="group h-full border border-[#E2E8F0] rounded-xl p-8 bg-white flex flex-col items-center justify-center gap-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.name}
                    className="h-[60px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="text-sm font-semibold text-[#0A1628]">{c.name}</div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7 — CATALOGUE CTA (navy + heartbeat gradient) ─── */}
      <section className="relative bg-[#0A1628] py-28 md:py-36 px-6 md:px-8 overflow-hidden">
        {/* Slow heartbeat radial glow (palette blue) */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 45%, rgba(37,99,235,0.55), transparent 70%)",
          }}
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <FadeInWhenVisible className="relative max-w-3xl mx-auto text-center">
          {/* Subtle green accent line — secondary nod to the green palette */}
          <div className="w-12 h-px bg-[#059669] mx-auto" />
          <p
            className="text-xs uppercase font-medium text-[#DBEAFE] mt-8"
            style={{ letterSpacing: "0.2em" }}
          >
            Get Started
          </p>
          <h2 className="text-white text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] mt-5">
            Request Our Detailed Product Catalogue
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
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-4">
              From Our Knowledge Base
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
                  className="group h-full bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 flex flex-col"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="transition-transform duration-500 group-hover:scale-[1.04]"
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
                    <h3 className="text-xl font-bold text-[#0A1628] mt-2 leading-snug tracking-tight">
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
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-4">
              Product Support Documents
            </h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              Download our warranty and care documentation for AVM surgical
              instruments.
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {downloads.map((d, i) => (
              <FadeInWhenVisible key={d.title} delay={i * 0.1} className="h-full">
                <div className="h-full bg-white rounded-2xl border border-[#E2E8F0] p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 flex flex-col items-center text-center">
                  <div
                    className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xs font-bold"
                    aria-hidden
                  >
                    PDF
                  </div>
                  <h3 className="text-base font-bold text-[#0A1628] mt-5 leading-snug tracking-tight">
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
