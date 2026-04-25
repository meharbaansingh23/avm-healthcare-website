import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";

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

const whyAvm = [
  {
    n: "01",
    title: "Premium grade materials",
    desc: "Hardened non-rusting steel meeting the toughest requirements.",
  },
  {
    n: "02",
    title: "Surgeon-driven innovation",
    desc: "New products developed directly from surgeons' concepts.",
  },
  {
    n: "03",
    title: "Customisation on request",
    desc: "Products tailored to individual users and institutions.",
  },
  {
    n: "04",
    title: "Global quality standards",
    desc: "CE, ISO and FDA certified. Quality monitored at every stage.",
  },
  {
    n: "05",
    title: "24×7 service support",
    desc: "Round-the-clock facility ensuring instruments are always operational.",
  },
  {
    n: "06",
    title: "Continuously evolving range",
    desc: "Catalogue constantly updated to meet surgical demands.",
  },
];

const specialtyGallery = [
  "Neurosurgical instruments",
  "Cardiovascular devices",
  "General surgery tools",
  "Gynaecology instruments",
];

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

export default function Home() {
  return (
    <>
      {/* HERO — dark, full viewport */}
      <section className="bg-[#0A1628]">
        <div className="min-h-screen flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center px-6 pt-32 pb-20">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-xs text-white/70 border border-white/10">
              <span className="block h-1.5 w-1.5 rounded-full bg-blue-400" aria-hidden />
              Surgical Instruments · Made in India · Since 1996
            </span>

            <h1 className="display-heading text-6xl md:text-7xl lg:text-8xl text-white font-bold mt-8">
              Precision instruments for modern surgical care
            </h1>

            <p className="text-white/55 text-xl leading-relaxed max-w-2xl mx-auto mt-6">
              AVM Healthcare Products supplies advanced surgical instruments
              to premier hospitals across India — from neurosurgery to
              cardiovascular care.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link
                href="/request-catalogue"
                className="bg-white text-[#0A1628] px-8 py-4 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Request catalogue
              </Link>
              <a
                href="#story"
                className="text-white/60 px-8 py-4 text-sm hover:text-white transition-colors"
              >
                Watch our story →
              </a>
            </div>
          </div>
        </div>

        {/* Full-width hero slideshow */}
        <HeroSlideshow />

        {/* Stats row */}
        <div className="border-t border-white/10 mt-1 py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="display-heading text-4xl text-white font-bold tabular-nums">
                  {s.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT STRIP */}
      <div className="bg-white py-6 px-6 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex items-center gap-12 overflow-x-auto whitespace-nowrap">
          <span className="text-[10px] uppercase tracking-widest text-[#94A3B8] shrink-0">
            Trusted by
          </span>
          <span className="text-sm text-[#94A3B8]">
            {trustedBy.join(" · ")}
          </span>
        </div>
      </div>

      {/* WHO WE ARE */}
      <section id="story" className="bg-white py-40 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="section-label">Who we are</p>
            <h2 className="display-heading text-5xl text-[#0A1628] font-bold mt-6 max-w-sm">
              Supplying surgical excellence since 1996
            </h2>
            <blockquote className="mt-8 border-l-4 border-blue-500 pl-6 font-serif italic text-xl text-[#0A1628] leading-relaxed">
              &ldquo;Our motto is to provide world-class instruments for the
              benefit of mankind.&rdquo;
            </blockquote>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl bg-black">
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

      {/* WHY CHOOSE AVM — dark with bordered grid */}
      <section className="bg-[#0A1628] py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase font-semibold text-blue-400" style={{ letterSpacing: "0.15em" }}>
            Why AVM
          </p>
          <h2 className="display-heading text-5xl md:text-6xl text-white font-bold mt-4">
            Built for the demands of modern surgery
          </h2>
          <p className="text-white/50 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
            Six commitments behind every instrument we put in a surgeon&rsquo;s hand.
          </p>
        </div>

        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {whyAvm.map((row) => (
            <div
              key={row.n}
              className="bg-[#0A1628] p-10 hover:bg-[#0d2240] transition-colors"
            >
              <div className="text-blue-500 font-serif text-sm font-bold mb-6 tracking-widest">
                {row.n}
              </div>
              <h3 className="text-white text-base font-semibold mb-3">
                {row.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {row.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FULL BLEED IMAGE STRIP */}
      {/* TODO: Replace with real specialty product photography */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {specialtyGallery.map((label) => (
          <div
            key={label}
            className="img-placeholder h-80 rounded-none"
          >
            {label}
          </div>
        ))}
      </div>

      {/* CTA — light, centered */}
      <section className="bg-white py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="display-heading text-5xl md:text-6xl text-[#0A1628] font-bold">
            Request our detailed product catalogue
          </h2>
          <p className="text-[#64748B] text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
            Over 3,400 surgical instruments across 6 specialties. Our team
            will send the full catalogue to your inbox within one business
            day.
          </p>
          <Link
            href="/request-catalogue"
            className="inline-block mt-10 bg-[#0A1628] text-white px-10 py-5 rounded-lg text-base font-semibold hover:bg-[#0d1f38] transition-colors"
          >
            Request full catalogue →
          </Link>
        </div>
      </section>

      {/* GROUP OF COMPANIES */}
      <section className="bg-[#F5F5F3] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Our group</p>
            <h2 className="display-heading text-5xl text-[#0A1628] font-bold mt-4">
              Part of a larger family
            </h2>
            <p className="text-[#64748B] text-lg mt-4 leading-relaxed">
              AVM Healthcare is part of a group of companies committed to
              advancing surgical and medical care.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {groupCompanies.map((c) => {
              const inner = (
                <>
                  {/* TODO: Replace with real logo */}
                  <div className="w-full h-16 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#CBD5E1] text-xs uppercase tracking-widest">
                    Logo
                  </div>
                  <div className="text-sm font-semibold text-[#0A1628] mt-5">
                    {c.name}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">{c.sub}</div>
                </>
              );
              const cardClass =
                "bg-white rounded-2xl p-8 border border-[#E2E8F0] hover:border-blue-200 hover:shadow-md transition-all";
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

      {/* DOWNLOADS */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="section-label">Resources</p>
            <h2 className="display-heading text-5xl text-[#0A1628] font-bold mt-4">
              Product support documents
            </h2>
            <p className="text-[#64748B] text-lg mt-4 leading-relaxed">
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
                  className="mt-6 text-blue-600 text-xs font-semibold hover:text-blue-700 inline-flex items-center gap-1 self-start"
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
