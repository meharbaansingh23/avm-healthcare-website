import Image from "next/image";
import Link from "next/link";
import AboutFaq from "@/components/AboutFaq";

export const metadata = {
  title: "About Us — AVM Healthcare Products Pvt. Ltd.",
  description:
    "AVM Healthcare Products is a New Delhi–based manufacturer of advanced surgical instruments, supplying premier institutions across India and exporting worldwide.",
};

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
  },
  {
    title: "Our Motive",
    body: "Surgeon priority with hundred percent satisfactory installations worldwide. Offering complete solutions from idea conceptualisation and product design to product launch, including validation with Govt. and Non-Govt. bodies under OEM arrangements.",
  },
  {
    title: "German Collaboration",
    body: "AVM produces indigenous products in collaboration with German engineering standards, and ANI products made in Germany — combining the best of Indian manufacturing with European precision.",
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
      {/* SECTION 1 — Page intro */}
      <section className="bg-white pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-[#94A3B8] tracking-widest uppercase mb-4">
              Est. 1996 · New Delhi, India
            </p>
            <h1
              className="font-semibold text-5xl text-[#0A1628] tracking-[-0.03em] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              An innovative company, made in India
            </h1>
            <p className="text-[#64748B] text-lg leading-relaxed mt-5 max-w-md">
              Indigenous surgical products developed in German collaboration —
              supplying premier institutions across India and worldwide since
              1996.
            </p>
          </div>
          <div>
            <Image
              src="/images/about/hero.webp"
              alt="AVM Healthcare"
              width={1686}
              height={1536}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "600px",
                objectFit: "contain",
                borderRadius: "20px",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Stats row */}
      <section className="bg-white pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-[#E2E8F0]">
          {aboutStats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 px-8 text-center ${
                i >= 2 ? "border-t border-[#E2E8F0] md:border-t-0" : ""
              } ${i > 0 ? "md:border-l md:border-[#E2E8F0]" : ""}`}
            >
              <div
                className="font-semibold text-5xl text-[#0A1628] tracking-[-0.04em] tabular-nums"
                style={{ letterSpacing: "-0.04em" }}
              >
                {s.value}
              </div>
              <div className="text-sm text-[#64748B] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Our story */}
      <section className="bg-[#F5F5F3] py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p
              className="text-xs uppercase font-medium text-blue-600"
              style={{ letterSpacing: "0.12em" }}
            >
              Who we are
            </p>
            <h2
              className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] mt-3 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              The leading manufacturer of advanced surgical instruments
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed mt-6">
              AVM Healthcare Products Pvt. Ltd. is a New Delhi–based
              manufacturer and supplier of surgical instruments and medical
              devices, engaged in the design, development, innovation,
              production and sales across neurosurgery, cranio surgery, plastic
              surgery, implants, spinal surgery, cardiovascular, gynaecology,
              ENT, orthopaedics, and more.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed mt-4">
              We produce AVM indigenous products in German collaboration and
              ANI products made in Germany, supplying to premier institutes of
              India and exporting to overseas markets.
            </p>
          </div>
          <div>
            <Image
              src="/images/about/who-we-are.webp"
              alt="Who we are at AVM"
              width={2960}
              height={1472}
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                borderRadius: "16px",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4 — Mission cards */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase font-medium text-blue-600"
            style={{ letterSpacing: "0.12em" }}
          >
            Purpose
          </p>
          <h2
            className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] mt-3 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Mission, motive & collaboration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {missionCards.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-8 border-t-4 border-t-blue-500 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-[#0A1628] mb-3">
                  {c.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — German callout */}
      <div className="bg-blue-50 border-y border-blue-100 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
          <span className="text-2xl" role="img" aria-label="Flag of Germany">
            🇩🇪
          </span>
          <p className="text-sm text-[#0A1628] flex-1 min-w-[240px]">
            Based in Germany? Our products are also available through ANI
            Instruments — our German precision partner.
          </p>
          <a
            href="https://www.animedtec.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold text-sm sm:ml-auto hover:text-blue-700"
          >
            Visit ANI Instruments →
          </a>
        </div>
      </div>

      {/* SECTION 6 — Certifications */}
      <section className="bg-[#F5F5F3] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p
            className="text-xs uppercase font-medium text-blue-600"
            style={{ letterSpacing: "0.12em" }}
          >
            Certifications & compliance
          </p>
          <h2
            className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] mt-3 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Built to the highest standards
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {certs.map((c) => (
              <div
                key={c.name}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-6 text-center flex flex-col items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt={c.name}
                  style={{
                    height: "56px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                <div className="text-sm font-semibold text-[#0A1628]">
                  {c.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p
              className="text-xs uppercase font-medium text-blue-600"
              style={{ letterSpacing: "0.12em" }}
            >
              FAQ
            </p>
            <h2
              className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] mt-3 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Frequently asked questions
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              Everything you need to know about AVM Healthcare Products.
            </p>
          </div>
          <div className="mt-12">
            <AboutFaq />
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA */}
      <section className="bg-[#F5F5F3] py-20 px-6">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div>
            <h3
              className="font-semibold text-2xl text-[#0A1628] tracking-[-0.03em] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Get our detailed product catalogue
            </h3>
            <p className="text-[#64748B] text-sm mt-2 max-w-md leading-relaxed">
              3,400+ instruments across 6 specialties — delivered within one
              business day.
            </p>
          </div>
          <Link
            href="/request-catalogue"
            className="bg-[#0A1628] hover:bg-[#0d1f38] text-white px-8 py-4 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Request full catalogue →
          </Link>
        </div>
      </section>
    </>
  );
}
