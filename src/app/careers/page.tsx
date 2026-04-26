import CareersForm from "@/components/CareersForm";

export const metadata = {
  title: "Careers — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Join AVM Healthcare. We are always looking for driven people who care about advancing surgical care.",
};

export default function CareersPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-white pt-32 pb-20 px-6 text-center">
        <p
          className="text-xs uppercase font-semibold text-blue-600 mb-6"
          style={{ letterSpacing: "0.15em" }}
        >
          Careers at AVM
        </p>
        <h1
          className="font-semibold text-5xl md:text-6xl text-[#0A1628] tracking-[-0.03em] leading-[1.05] max-w-3xl mx-auto"
          style={{ letterSpacing: "-0.03em" }}
        >
          Join the team shaping surgical care in India
        </h1>
        <p className="text-[#64748B] text-lg leading-relaxed mt-6 max-w-xl mx-auto">
          We don&rsquo;t have specific openings listed right now — but
          we&rsquo;re always interested in meeting talented people who care
          about healthcare and want to make a difference.
        </p>
        <a
          href="#apply"
          className="inline-block mt-10 bg-[#0A1628] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors"
        >
          Express your interest
        </a>
      </section>

      {/* HERO IMAGE — full-bleed, navy duotone treatment */}
      {/* TODO: Replace with an AVM-specific photo of the team / facility / surgeons in the field */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1685997180450-242a65624238?auto=format&fit=crop&w=2400&q=80"
          alt="Surgical team in an operating room"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "grayscale(100%)",
          }}
        />
        {/* Navy duotone overlay: mix-blend-color applies navy chrominance to the grayscale image's luminance */}
        <div
          className="absolute inset-0 bg-[#0A1628] mix-blend-color pointer-events-none"
          aria-hidden
        />
      </div>

      {/* FORM SECTION */}
      <section id="apply" className="bg-white pt-24 pb-32 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Express your interest
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              Tell us a bit about yourself and what you&rsquo;d like to bring
              to AVM. We&rsquo;ll keep your profile on file and reach out when
              a suitable opportunity opens up.
            </p>
          </div>
          <CareersForm />
        </div>
      </section>
    </>
  );
}
