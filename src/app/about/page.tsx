import Link from "next/link";
import AboutFaq from "@/components/AboutFaq";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import KenBurnsImage from "@/components/KenBurnsImage";
import AnimatedCounter from "@/components/AnimatedCounter";
import ImageCarousel, { type CarouselImage } from "@/components/ImageCarousel";
import PillButton from "@/components/PillButton";

// "Our Instruments" carousel — breadth of surgical disciplines AVM manufactures.
// Dimensions are the natural source sizes so each card keeps its true ratio.
const instrumentGallery: CarouselImage[] = [
  { src: "/images/general-surgery-detail.webp", alt: "General surgery instrument, close detail", width: 1504, height: 1003 },
  { src: "/images/gallery-5.webp", alt: "Surgical instruments arranged on a surface", width: 3991, height: 1967 },
  { src: "/images/gallery-7.webp", alt: "Polished surgical instruments in detail", width: 5145, height: 3795 },
  { src: "/images/gallery-1.webp", alt: "General surgery instrument set", width: 1504, height: 1004 },
  { src: "/images/gallery-kerrison-2.webp", alt: "Kerrison rongeur instrument detail", width: 1924, height: 1084 },
  { src: "/images/neurosurgical.webp", alt: "Neurosurgical instruments", width: 1924, height: 995 },
  { src: "/images/cardiovascular.webp", alt: "Cardiovascular surgical instruments", width: 1502, height: 1004 },
  { src: "/images/plastic-oral.webp", alt: "Plastic and oral surgery instruments", width: 1024, height: 1024 },
  { src: "/images/gallery-gs-alt.webp", alt: "General surgery instruments, alternate view", width: 1504, height: 1004 },
];

export const metadata = {
  title: "About Us — AVM Healthcare Products Pvt. Ltd.",
  description:
    "AVM Healthcare Products is a New Delhi–based manufacturer of advanced surgical instruments, supplying premier institutions across India and exporting worldwide.",
};

// Client-provided photography.
const ABOUT_HERO_IMAGE = "/images/hero-2.webp"; // instruments laid out in an operating room
const ABOUT_TEAM_IMAGE = "/images/neurosurgical-alt.webp"; // neurosurgical instrument set

const aboutStats = [
  { key: "skus", target: 10000, suffix: "+", thousands: true, label: "Healthcare SKUs" },
  { key: "institutions", target: 250, suffix: "+", thousands: false, label: "Institutions Served" },
  { key: "fulfilment", target: 100, suffix: "%", thousands: false, label: "On-Time Fulfilment" },
  { key: "years", target: 30, suffix: "+", thousands: false, label: "Years Active" },
];

const missionCards = [
  {
    title: "Our Mission",
    body: "To provide world-class instruments for the benefit of mankind. Our motto is to continuously evolve our product range to meet the dynamic requirements of surgical users.",
    accent: "blue" as const,
  },
  {
    title: "Our Motive",
    body: "Surgeon priority with hundred percent satisfactory installations worldwide. Offering complete solutions from idea conceptualisation and product design to product launch, including validation with Govt. and Non-Govt. bodies under OEM arrangements.",
    accent: "blue" as const,
  },
  {
    // SANCTIONED GREEN ACCENT — this is the international / precision card.
    title: "German Collaboration",
    body: "AVM produces indigenous products in collaboration with German engineering standards, and ANI products made in Germany — combining the best of Indian manufacturing with European precision.",
    accent: "green" as const,
  },
];

const certs = [
  { name: "CE Certified", img: "/images/certifications/ce.png" },
  { name: "ISO Certified", img: "/images/certifications/iso.png" },
  { name: "FDA Compliant", img: "/images/certifications/fda.png" },
  { name: "NSIC Registered", img: "/images/certifications/nsic.png" },
];

export default function AboutPage() {
  return (
    <>
      {/* ─── SECTION 1 — HERO (centered, the biggest type on the site) ─── */}
      <section className="bg-white pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-8">
        <FadeInWhenVisible className="text-center max-w-4xl mx-auto">
          <p
            className="text-xs uppercase font-medium text-[#94A3B8]"
            style={{ letterSpacing: "0.2em" }}
          >
            Est. 1996 · New Delhi, India
          </p>
          <h1 className="text-[#0A1628] text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mt-6">
            An Innovative Company, Made In India
          </h1>
          <p className="text-[#475569] text-lg leading-relaxed mt-8 max-w-[700px] mx-auto">
            Indigenous surgical products developed in German collaboration —
            supplying premier institutions across India and worldwide since
            1996.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1} className="mt-14 max-w-7xl mx-auto">
          <KenBurnsImage
            src={ABOUT_HERO_IMAGE}
            alt="AVM surgical instruments laid out in an operating room"
            priority
            sizes="100vw"
            className="w-full aspect-[21/9] rounded-2xl border border-[#E2E8F0] shadow-2xl shadow-[#0A1628]/10"
          />
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 2 — STATS (animated counters) ─── */}
      <section className="bg-white pb-20 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {aboutStats.map((s, i) => (
              <div
                key={s.key}
                className={`py-10 px-8 text-center flex flex-col justify-center items-center ${
                  i >= 2 ? "border-t border-[#E2E8F0] md:border-t-0" : ""
                } ${i > 0 ? "md:border-l md:border-[#E2E8F0]" : ""} ${
                  i % 2 === 1 ? "border-l border-[#E2E8F0] md:border-l" : ""
                }`}
              >
                <AnimatedCounter
                  target={s.target}
                  suffix={s.suffix}
                  thousands={s.thousands}
                  durationMs={2000}
                  className="font-bold text-5xl text-[#0A1628] tracking-[-0.04em] tabular-nums"
                />
                <div className="text-sm text-[#475569] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 3 — WHO WE ARE (centered text + Ken Burns image) ─── */}
      <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-[800px] mx-auto">
            <p className="section-label">Who We Are</p>
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
              The Leading Manufacturer Of Advanced Surgical Instruments
            </h2>
            <p className="text-[#475569] text-base leading-relaxed mt-6">
              AVM Healthcare Products Pvt. Ltd. is a New Delhi–based manufacturer
              and supplier of surgical instruments and medical devices, engaged
              in the design, development, innovation, production and sales across
              neurosurgery, cranio surgery, plastic surgery, implants, spinal
              surgery, cardiovascular, gynaecology, ENT, orthopaedics, and more.
            </p>
            <p className="text-[#475569] text-base leading-relaxed mt-4">
              We produce AVM indigenous products in German collaboration and ANI
              products made in Germany, supplying to premier institutes of India
              and exporting to overseas markets.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.1} className="mt-14 max-w-4xl mx-auto">
            <KenBurnsImage
              src={ABOUT_TEAM_IMAGE}
              alt="AVM neurosurgical instrument set"
              sizes="(min-width: 1024px) 896px, 100vw"
              className="w-full aspect-[3/2] rounded-2xl border border-[#E2E8F0] shadow-2xl shadow-[#0A1628]/10"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 4 — MISSION CARDS (German Collaboration = green accent) ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Purpose</p>
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
              Mission, Motive &amp; Collaboration
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {missionCards.map((c, i) => {
              const isGreen = c.accent === "green";
              return (
                <FadeInWhenVisible key={c.title} delay={i * 0.15} className="h-full">
                  <div className="h-full bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 flex flex-col items-center">
                    {/* Accent marker — green only for the international/precision card */}
                    <div
                      className={`w-10 h-0.5 ${isGreen ? "bg-[#059669]" : "bg-blue-600"}`}
                    />
                    <h3
                      className={`text-xl md:text-2xl font-bold tracking-tight mt-5 ${
                        isGreen ? "text-[#059669]" : "text-[#0A1628]"
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed mt-3">
                      {c.body}
                    </p>
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4.5 — OUR INSTRUMENTS (image gallery carousel) ─── */}
      <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#FAFAF9" }}>
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto px-6 md:px-8">
          <p className="section-label">Our Instruments</p>
          <h2 className="text-[#0A1628] text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] mt-4">
            Built For Every Surgical Discipline
          </h2>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed mt-5 max-w-[600px] mx-auto">
            From neurosurgery to cardiovascular care — a glimpse into the breadth
            of instruments we manufacture.
          </p>
        </FadeInWhenVisible>

        <div className="mt-16">
          <ImageCarousel images={instrumentGallery} speedSeconds={60} fadeColor="#FAFAF9" />
        </div>
      </section>

      {/* ─── SECTION 5 — ANI callout strip (centered, animated arrow) ─── */}
      <div className="bg-blue-50 border-y border-blue-100 py-8 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3">
          <p className="text-base md:text-lg text-[#0A1628]">
            Based in Germany? Our products are also available through ANI
            Instruments — our German precision partner.
          </p>
          <PillButton href="https://www.animedtec.com/" external>
            Visit ANI Instruments
          </PillButton>
        </FadeInWhenVisible>
      </div>

      {/* ─── SECTION 6 — CERTIFICATIONS (centered) ─── */}
      <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Certifications &amp; Compliance</p>
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
              Built To The Highest Standards
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {certs.map((c, i) => (
              <FadeInWhenVisible key={c.name} delay={i * 0.1} className="h-full">
                <div className="group h-full bg-white border border-[#E2E8F0] rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.name}
                    className="h-[60px] w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="text-sm font-semibold text-[#0A1628]">
                    {c.name}
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7 — FAQ (centered) ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <FadeInWhenVisible className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#475569] mt-5 leading-relaxed">
              Everything you need to know about AVM Healthcare Products.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1} className="mt-12 text-left">
            <AboutFaq />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 8 — CTA (centered) ─── */}
      <section className="bg-[#FAFAF9] py-20 px-6 md:px-8">
        <FadeInWhenVisible className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-12 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h3 className="display-heading text-[#0A1628] text-3xl md:text-4xl">
            Get Our Detailed Product Catalogue
          </h3>
          <p className="text-[#475569] text-sm mt-3 max-w-md leading-relaxed">
            3,400+ instruments across 6 specialties — delivered within one
            business day.
          </p>
          <Link
            href="/request-catalogue"
            className="inline-flex items-center gap-2 mt-8 bg-[#0A1628] hover:bg-[#0d1f38] text-white px-8 py-4 rounded-lg text-sm font-semibold transition-colors"
          >
            Request full catalogue →
          </Link>
        </FadeInWhenVisible>
      </section>
    </>
  );
}
