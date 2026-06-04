import Image from "next/image";
import Link from "next/link";
import AboutFaq from "@/components/AboutFaq";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "About Us — AVM Healthcare Products Pvt. Ltd.",
  description:
    "AVM Healthcare Products is a New Delhi–based manufacturer of advanced surgical instruments, supplying premier institutions across India and exporting worldwide.",
};

// PLACEHOLDER IMAGERY — to be replaced by client-provided photography.
// Verified real Unsplash CDN URLs.
const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80"; // modern operating-room facility
const ABOUT_TEAM_IMAGE =
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=80"; // surgical team operating

const aboutStats = [
  { value: "10,000+", label: "Healthcare SKUs" },
  { value: "250+", label: "Institutions served" },
  { value: "100%", label: "On-time fulfilment" },
  { value: "30+", label: "Years active" },
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
      {/* ─── SECTION 1 — HERO (centered, oversized, single image) ─── */}
      <section className="bg-white pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-[700px] mx-auto">
            <p
              className="text-xs uppercase font-medium text-[#94A3B8]"
              style={{ letterSpacing: "0.2em" }}
            >
              Est. 1996 · New Delhi, India
            </p>
            <h1 className="display-heading text-[#0A1628] text-6xl md:text-8xl mt-5">
              An innovative company, made in India
            </h1>
            <p className="text-[#475569] text-lg leading-relaxed mt-6">
              Indigenous surgical products developed in German collaboration —
              supplying premier institutions across India and worldwide since
              1996.
            </p>
          </FadeInWhenVisible>

          {/* PLACEHOLDER — client to replace with AVM facility / manufacturing photography */}
          <FadeInWhenVisible delay={0.1} className="mt-14">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
              <Image
                src={ABOUT_HERO_IMAGE}
                alt="Modern operating-room facility"
                fill
                priority
                sizes="(min-width: 1024px) 1152px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 2 — STATS (centered card) ─── */}
      <section className="bg-white pb-20 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {aboutStats.map((s, i) => (
              <div
                key={s.label}
                className={`py-10 px-8 text-center flex flex-col justify-center items-center ${
                  i >= 2 ? "border-t border-[#E2E8F0] md:border-t-0" : ""
                } ${i > 0 ? "md:border-l md:border-[#E2E8F0]" : ""}`}
              >
                <div className="font-bold text-5xl text-[#0A1628] tracking-[-0.04em] tabular-nums">
                  {s.value}
                </div>
                <div className="text-sm text-[#475569] mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* ─── SECTION 3 — WHO WE ARE (centered text + image) ─── */}
      <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-[800px] mx-auto">
            <p className="section-label">Who we are</p>
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-5xl mt-4">
              The leading manufacturer of advanced surgical instruments
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

          {/* PLACEHOLDER — client to replace with AVM surgical-team photography */}
          <FadeInWhenVisible delay={0.1} className="mt-14 max-w-4xl mx-auto">
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-lg border border-[#E2E8F0]">
              <Image
                src={ABOUT_TEAM_IMAGE}
                alt="Surgical team operating"
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ─── SECTION 4 — MISSION CARDS (German Collaboration = green accent) ─── */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-2xl mx-auto">
            <p className="section-label">Purpose</p>
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              Mission, motive &amp; collaboration
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {missionCards.map((c, i) => {
              const isGreen = c.accent === "green";
              return (
                <FadeInWhenVisible key={c.title} delay={i * 0.1} className="h-full">
                  <div className="h-full bg-white border border-[#E2E8F0] rounded-2xl p-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200 flex flex-col items-center">
                    {/* Accent marker — green only for the international/precision card */}
                    <div
                      className={`w-10 h-0.5 ${isGreen ? "bg-[#059669]" : "bg-blue-600"}`}
                    />
                    <h3
                      className={`text-base font-semibold mt-5 ${
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

      {/* ─── SECTION 5 — ANI callout strip (centered, no emoji) ─── */}
      <div className="bg-blue-50 border-y border-blue-100 py-6 px-6 md:px-8">
        <FadeInWhenVisible className="max-w-3xl mx-auto text-center flex flex-col items-center gap-2">
          <p className="text-sm text-[#0A1628]">
            Based in Germany? Our products are also available through ANI
            Instruments — our German precision partner.
          </p>
          <a
            href="https://www.animedtec.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-sm hover:text-blue-700"
          >
            Visit ANI Instruments →
          </a>
        </FadeInWhenVisible>
      </div>

      {/* ─── SECTION 6 — CERTIFICATIONS (centered) ─── */}
      <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
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
                <div className="h-full bg-white border border-[#E2E8F0] rounded-xl p-8 text-center flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.name}
                    style={{ height: "60px", width: "auto", objectFit: "contain", display: "block" }}
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
            <h2 className="display-heading text-[#0A1628] text-5xl md:text-6xl mt-4">
              Frequently asked questions
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
            Get our detailed product catalogue
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
