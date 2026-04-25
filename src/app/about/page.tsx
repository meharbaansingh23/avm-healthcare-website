import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "About Us — AVM Healthcare Products Pvt. Ltd.",
  description:
    "AVM Healthcare Products is a New Delhi–based manufacturer of advanced surgical instruments, supplying premier institutions across India and exporting worldwide.",
};

const aboutStats = [
  { value: "3,400+", label: "Products in catalogue" },
  { value: "36+", label: "Client hospitals" },
  { value: "30+", label: "Years of excellence" },
  { value: "Global", label: "Exports worldwide" },
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

const certs = ["CE Certified", "ISO Certified", "FDA Compliant", "NSIC Registered"];

const detailRows: Array<[string, React.ReactNode]> = [
  [
    "Registered Office",
    "17-19 A Block Chhatarpur Extension, Rajpur Road, New Delhi",
  ],
  [
    "Manufacturing Unit",
    "HR-11A, Street No. 10, New Rohtak Road Industrial Area, New Delhi",
  ],
  [
    "Email",
    <a
      key="email"
      href="mailto:info@avmhealthcare.com"
      className="text-blue-600 hover:text-blue-700"
    >
      info@avmhealthcare.com
    </a>,
  ],
  ["GST", "07AABCA1500D1ZM"],
  ["IEC", "0597024685"],
  ["Trade Mark No.", "4621659"],
];

const clientHospitals = [
  "AIIMS Delhi",
  "Medanta Hospital",
  "Fortis Hospital",
  "Apollo Hospitals",
  "KEM Hospital Mumbai",
  "PGI Chandigarh",
  "GB Pant Hospital",
  "Lilavati Hospital",
  "Sir Ganga Ram Hospital",
  "AIIMS Rishikesh",
  "KIMS Hyderabad",
  "Madras Medical College",
  "Safdarjung Hospital",
  "RML Hospital Delhi",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="An innovative company, made in India"
        subtitle="Indigenous surgical products developed in German collaboration — supplying premier institutions since 1996."
      />

      {/* German callout banner */}
      <div className="bg-blue-50 border-y border-blue-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <span className="text-2xl" aria-hidden>
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

      {/* Company intro */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="section-label">Who we are</p>
            <h2
              className="font-serif text-4xl text-[#0A1628] font-bold mt-6 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              The leading manufacturer of advanced surgical instruments
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed mt-6">
              AVM Healthcare Products Pvt. Ltd. is a New Delhi–based
              manufacturer and supplier of surgical instruments and medical
              devices, engaged in the design, development, innovation,
              production and sales of all kinds of surgical instruments —
              spanning neurosurgery, cranio surgery, plastic surgery, implants,
              spinal surgery, cardiovascular, gynaecology, ENT, orthopaedics,
              and more.
            </p>
            <p className="text-[#64748B] text-base leading-relaxed mt-4">
              We produce AVM indigenous products in German collaboration and
              ANI products made in Germany, supplying to premier institutes of
              India and exporting to overseas markets.
            </p>
            {/* TODO: Replace with real image */}
            <div className="img-placeholder h-64 w-full mt-8">
              Company / facility image
            </div>
          </div>

          <div>
            {aboutStats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 flex items-baseline gap-3 ${
                  i < aboutStats.length ? "border-b border-[#E2E8F0]" : ""
                }`}
              >
                <span
                  className="font-serif text-4xl font-bold text-[#0A1628]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </span>
                <span className="text-sm text-[#64748B]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission section */}
      <section className="bg-[#F5F5F3] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Purpose</p>
          <h2 className="section-heading mt-6">
            Mission, motive & collaboration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {missionCards.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-xl border border-[#E2E8F0] border-t-4 border-t-blue-500 p-8"
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

      {/* Image placeholder section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* TODO: Replace with real facility or team photos */}
          <div className="img-placeholder h-72">Facility / team image</div>
          <div className="img-placeholder h-72">Facility / team image</div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">Certifications & compliance</p>
          <h2 className="section-heading mt-6">
            Built to the highest standards
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {certs.map((name) => (
              <div
                key={name}
                className="border border-[#E2E8F0] rounded-xl p-6 text-center bg-white"
              >
                <div className="text-blue-600 text-xl font-bold">✓</div>
                <div className="text-sm font-semibold text-[#0A1628] mt-2">
                  {name}
                </div>
              </div>
            ))}
          </div>

          <table className="w-full mt-12 border-collapse">
            <tbody>
              {detailRows.map(([k, v]) => (
                <tr key={k} className="border-b border-[#E2E8F0]">
                  <td className="py-4 text-sm text-[#64748B] w-48 align-top pr-4">
                    {k}
                  </td>
                  <td className="py-4 text-sm text-[#0A1628] font-medium">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-[#0A1628] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.15em] font-semibold text-blue-400">
            Our clients
          </p>
          <h2
            className="font-serif text-4xl text-white font-bold mt-2 leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            Trusted by India&rsquo;s leading hospitals
          </h2>
          <div className="flex flex-wrap gap-3 mt-10">
            {clientHospitals.map((h) => (
              <span
                key={h}
                className="border border-white/20 rounded-full px-4 py-2 text-sm text-white/75"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A1628] pb-28 px-6">
        <div className="bg-[#0C447C] rounded-2xl p-12 max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div>
            <h3
              className="font-serif text-3xl text-white font-bold leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Get our detailed product catalogue
            </h3>
            <p className="text-white/60 text-sm mt-2 max-w-md leading-relaxed">
              3,400+ instruments across 6 specialties — delivered within one
              business day.
            </p>
          </div>
          <Link
            href="/request-catalogue"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-md text-sm font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Request full catalogue →
          </Link>
        </div>
      </section>
    </>
  );
}
