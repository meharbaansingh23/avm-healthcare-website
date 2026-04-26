import Link from "next/link";
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
    n: "01",
    title: "Neurosurgical",
    desc: "Instruments for cranial, spinal and micro-neurosurgical procedures — forceps, retractors, dissectors and more.",
    label: "Neurosurgical instruments",
  },
  {
    n: "02",
    title: "General Surgery",
    desc: "Core surgical instruments for operating theatres — clamps, scissors, needle holders, and tissue handling tools.",
    label: "General surgery tools",
  },
  {
    n: "03",
    title: "Cardiovascular",
    desc: "Precision devices for cardiac and vascular interventions — purpose-built for demanding cardiovascular procedures.",
    label: "Cardiovascular devices",
  },
  {
    n: "04",
    title: "Gynaecology",
    desc: "Specialised instruments for women's health — designed for both routine and complex gynaecological procedures.",
    label: "Gynaecology instruments",
  },
  {
    n: "05",
    title: "Plastic & Oral Surgery",
    desc: "Precision tools for reconstructive and oral surgical procedures — delicate instruments for exacting work.",
    label: "Plastic & oral instruments",
  },
  {
    n: "06",
    title: "Containers & Pads",
    desc: "Sterile storage solutions and procedural support items for the modern operating theatre.",
    label: "Containers & pads",
  },
];

const whyAvm = [
  {
    n: "01",
    title: "Premium grade materials",
    desc: "Hardened non-rusting steel meeting the toughest requirements for elasticity, tenacity and corrosion resistance.",
  },
  {
    n: "02",
    title: "Surgeon-driven innovation",
    desc: "New products developed directly from surgeons' concepts, ensuring instruments meet real operating theatre needs.",
  },
  {
    n: "03",
    title: "Customisation on request",
    desc: "Products tailored to the specific requirements of individual users and institutions worldwide.",
  },
  {
    n: "04",
    title: "Global quality standards",
    desc: "CE, ISO and FDA certified. Quality monitored at every stage of manufacturing.",
  },
  {
    n: "05",
    title: "24×7 service support",
    desc: "Round-the-clock service facility ensuring your instruments are always in optimal condition.",
  },
  {
    n: "06",
    title: "Continuously evolving range",
    desc: "Catalogue constantly updated to meet the dynamic and changing requirements of surgical users globally.",
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
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Our specialties</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
              Six disciplines, one commitment to quality
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              We supply precision instruments across six major surgical
              specialties — each category developed with direct input from
              practicing surgeons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {specialties.map((s) => (
              <div
                key={s.n}
                className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer text-center"
              >
                <div className="text-blue-500 text-xs font-bold tracking-widest">
                  {s.n}
                </div>
                <h3 className="text-sm font-semibold text-[#0A1628] mt-2">
                  {s.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                  {s.desc}
                </p>
                {/* TODO: Replace with real specialty image */}
                <div className="img-placeholder h-28 w-full rounded-xl mt-6">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY CHOOSE AVM */}
      <section className="bg-[#F5F5F3] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Why choose AVM</p>
            <h2 className="text-5xl font-semibold text-[#0A1628] mt-3 tracking-[-0.03em]" style={{ letterSpacing: "-0.03em" }}>
              Built for the demands of modern surgery
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              Six commitments behind every instrument we put in a
              surgeon&rsquo;s hand.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mt-16 items-start">
            <div className="flex flex-col gap-6">
              {/* TODO: Replace with real product image */}
              <div className="img-placeholder h-80 w-full rounded-2xl">
                Product / instruments image
              </div>
              <p className="font-medium italic text-xl text-[#0A1628] leading-relaxed mt-4">
                &ldquo;Every instrument we supply is chosen with one question
                in mind — will it perform when it matters most?&rdquo;
              </p>
            </div>

            <div>
              {whyAvm.map((row, i) => (
                <div
                  key={row.n}
                  className={`flex items-start gap-5 py-6 ${
                    i < whyAvm.length - 1 ? "border-b border-[#F1F5F9]" : ""
                  }`}
                >
                  <span className="text-xs font-bold text-blue-400 w-8 shrink-0 mt-0.5" style={{ letterSpacing: "0.15em" }}>
                    {row.n}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0A1628]">
                      {row.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                      {row.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
