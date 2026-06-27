import Image from "next/image";
import CareersForm from "@/components/CareersForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "Careers — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Join AVM Healthcare. We are always looking for driven people who care about advancing surgical care.",
};

export default function CareersPage() {
  return (
    <>
      {/* HERO — centered, on one cohesive off-white section with the image */}
      <section className="bg-[#FAFAF9] pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-8 text-center">
        <FadeInWhenVisible className="max-w-3xl mx-auto">
          <p className="section-label">Careers at AVM</p>
          <h1 className="text-[#0A1628] text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mt-5">
            Join The Team Shaping Surgical Care In India
          </h1>
          <p className="text-[#475569] text-base md:text-lg leading-relaxed mt-6 max-w-xl mx-auto">
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
        </FadeInWhenVisible>

        {/* HERO IMAGE — navy duotone treatment, sized down to sit with the text */}
        {/* TODO: Replace with an AVM-specific photo of the team / facility / surgeons in the field */}
        <FadeInWhenVisible delay={0.1} className="relative w-full max-w-4xl mx-auto mt-14">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl shadow-[#0A1628]/10">
            <Image
              src="/images/careers.png"
              alt="AVM Healthcare team"
              width={1990}
              height={1137}
              priority
              sizes="(min-width: 896px) 896px, 100vw"
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
        </FadeInWhenVisible>
      </section>

      {/* FORM SECTION */}
      <section id="apply" className="bg-white pt-24 pb-32 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <FadeInWhenVisible className="text-center mb-12">
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-5xl">
              Express Your Interest
            </h2>
            <p className="text-[#475569] mt-4 leading-relaxed max-w-xl mx-auto">
              Tell us a bit about yourself and what you&rsquo;d like to bring to
              AVM. We&rsquo;ll keep your profile on file and reach out when a
              suitable opportunity opens up.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <CareersForm />
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
