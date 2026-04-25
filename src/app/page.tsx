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
    desc: "Proper care and maintenance of surgical instruments",
    href: "/downloads/Care and Maintenance of Surgical Instruments.pdf",
  },
  {
    title: "Certificate of Authenticity",
    desc: "Official certificate of authenticity for AVM products",
    href: "/downloads/Certificate of Authenticity.pdf",
  },
  {
    title: "Warranty Certificate",
    desc: "Standard warranty certificate for AVM instruments",
    href: "/downloads/Warranty Certificate.pdf",
  },
  {
    title: "Warranty by AVM",
    desc: "Complete warranty terms offered by AVM Healthcare",
    href: "/downloads/Warranty offered by AVM.pdf",
  },
];

export default function Home() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[55fr_45fr] gap-16 lg:gap-20 items-center py-20">
          <div>
            <p className="section-label">
              Surgical Instruments · Made in India
            </p>
            <h1
              className="font-serif text-5xl lg:text-7xl font-bold text-[#0A1628] mt-6 leading-[1.05]"
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
              <Link href="/request-catalogue" className="btn-primary">
                Request catalogue
              </Link>
              <a href="#video" className="btn-secondary">
                Watch our story →
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-[#E2E8F0] flex flex-wrap gap-10">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-serif text-3xl text-[#0A1628] font-bold"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#64748B] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <HeroSlideshow />
          </div>
        </div>
      </section>

      {/* Trusted by strip */}
      <div className="border-t border-b border-[#E2E8F0] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center gap-x-10 gap-y-2">
          <span className="text-[10px] uppercase tracking-[0.15em] text-[#64748B]">
            Trusted by
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            {trustedBy.map((name, i) => (
              <span key={name} className="flex items-center gap-6">
                <span className="text-sm text-[#64748B]">{name}</span>
                {i < trustedBy.length - 1 && (
                  <span className="text-[#CBD5E1]" aria-hidden>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2 — Who We Are */}
      <section id="video" className="bg-[#F5F5F3] py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="section-label">Who we are</p>
            <h2 className="section-heading mt-6">
              Supplying surgical excellence since 1996
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed mt-6">
              AVM Healthcare Products Pvt. Ltd. is a New Delhi–based
              manufacturer and supplier of advanced quality surgical
              instruments and medical devices. We design, develop, and supply
              instruments across neurosurgery, general surgery, cardiovascular,
              gynaecology, plastic surgery, and more — serving premier
              institutions including AIIMS, Medanta, Fortis, Apollo, and KEM
              Hospital.
            </p>
            <blockquote className="border-l-4 border-blue-600 pl-5 mt-6 font-serif italic text-xl text-[#0A1628]">
              “Our motto is to provide world-class instruments for the benefit
              of mankind.”
            </blockquote>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-black">
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

      {/* Section 3 — Why Choose AVM */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[40fr_60fr] gap-16 lg:gap-20">
          <div>
            <p className="section-label">Why AVM</p>
            <h2 className="section-heading mt-6 mb-10">
              Built for the demands of modern surgery
            </h2>
            {/* TODO: Replace with real image */}
            <div className="img-placeholder h-72 w-full mb-8">
              Why AVM image
            </div>
            <p className="font-serif italic text-xl text-[#0A1628] leading-relaxed">
              “Every instrument we supply is chosen with one question in mind —
              will it perform when it matters most?”
            </p>
          </div>

          <div>
            {whyAvm.map((row) => (
              <div
                key={row.n}
                className="flex items-start gap-6 py-5 border-b border-[#F1F5F9]"
              >
                <span className="font-serif text-sm text-[#CBD5E1] w-10 shrink-0">
                  {row.n}
                </span>
                <span className="text-sm font-semibold text-[#0A1628] w-48 shrink-0">
                  {row.title}
                </span>
                <span className="text-sm text-[#64748B] flex-1">
                  {row.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Request Catalogue CTA */}
      <section className="bg-[#0A1628] py-28 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-xl relative z-10">
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-blue-400">
              Get started
            </p>
            <h2
              className="font-serif text-5xl text-white mt-6 leading-[1.1]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Request our detailed product catalogue
            </h2>
            <p className="text-white/55 text-lg mt-4 max-w-md leading-relaxed">
              Over 3,400 surgical instruments across 6 specialties. Our team
              will send the full catalogue to your inbox within one business
              day.
            </p>
            <Link
              href="/request-catalogue"
              className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-sm font-medium transition-colors"
            >
              Request full catalogue →
            </Link>
          </div>
          <div
            aria-hidden
            className="absolute right-12 bottom-0 font-serif text-[200px] text-white/[0.03] leading-none select-none pointer-events-none"
            style={{ letterSpacing: "-0.03em" }}
          >
            3,400
          </div>
        </div>
      </section>

      {/* Section 5 — Group of Companies */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label">Our group</p>
          <h2 className="section-heading mt-6">Part of a larger family</h2>
          <p className="text-[#64748B] text-base leading-relaxed mt-4 max-w-2xl">
            AVM Healthcare is part of a group of companies committed to
            advancing surgical and medical care.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {groupCompanies.map((c) => {
              const Inner = (
                <>
                  {/* TODO: Replace with real image */}
                  <div className="w-[120px] h-12 bg-[#F1F5F9] rounded-md flex items-center justify-center text-[#CBD5E1] text-[10px] uppercase tracking-[0.15em]">
                    Logo
                  </div>
                  <div className="text-sm font-semibold text-[#0A1628] mt-4">
                    {c.name}
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">{c.sub}</div>
                </>
              );

              return c.href ? (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-t-2 border-[#E2E8F0] pt-6 hover:border-blue-600 transition-colors"
                >
                  {Inner}
                </a>
              ) : (
                <div
                  key={c.name}
                  className="border-t-2 border-[#E2E8F0] pt-6"
                >
                  {Inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6 — Downloads */}
      <section className="bg-[#F5F5F3] py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label">Resources</p>
          <h2 className="section-heading mt-6">Product support documents</h2>
          <p className="text-[#64748B] text-base leading-relaxed mt-4 max-w-2xl">
            Download our warranty and care documentation for AVM surgical
            instruments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {downloads.map((d) => (
              <div
                key={d.title}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-400 flex items-center justify-center text-xs font-bold">
                  PDF
                </div>
                <div className="text-sm font-semibold text-[#0A1628] mt-4">
                  {d.title}
                </div>
                <p className="text-xs text-[#64748B] mt-1 flex-1">{d.desc}</p>
                <a
                  href={d.href}
                  download
                  className="mt-4 text-blue-600 text-xs font-semibold hover:text-blue-700 inline-flex items-center gap-1 self-start"
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
