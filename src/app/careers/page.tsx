import Image from "next/image";
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
      <section className="bg-white pt-16 pb-12 px-6 text-center">
        <p
          className="text-xs uppercase font-semibold text-blue-600 mb-5"
          style={{ letterSpacing: "0.15em" }}
        >
          Careers at AVM
        </p>
        <h1
          className="font-semibold text-4xl md:text-5xl text-[#0A1628] tracking-[-0.03em] leading-[1.05] max-w-3xl mx-auto"
          style={{ letterSpacing: "-0.03em" }}
        >
          Join the team shaping surgical care in India
        </h1>
        <p className="text-[#64748B] text-base md:text-lg leading-relaxed mt-5 max-w-xl mx-auto">
          We don&rsquo;t have specific openings listed right now — but
          we&rsquo;re always interested in meeting talented people who care
          about healthcare and want to make a difference.
        </p>
        <a
          href="#apply"
          className="inline-block mt-8 bg-[#0A1628] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors"
        >
          Express your interest
        </a>
      </section>

      {/* HERO IMAGE — natural aspect ratio, navy duotone treatment */}
      {/* TODO: Replace with an AVM-specific photo of the team / facility / surgeons in the field */}
      <div className="relative w-full max-w-7xl mx-auto">
        <Image
          src="/images/careers.png"
          alt="AVM Healthcare team"
          width={1990}
          height={1137}
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          style={{
            width: "100%",
            height: "auto",
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
