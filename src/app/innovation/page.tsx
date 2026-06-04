import Image from "next/image";
import InnovationForm from "@/components/InnovationForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "Innovation — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Collaborate with AVM Healthcare on new product concepts, manufacturing partnerships, research, and technology licensing.",
};

export default function InnovationPage() {
  return (
    <>
      {/* HERO — centered */}
      <section className="bg-white pt-20 pb-16 md:pt-24 md:pb-20 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible className="text-center max-w-3xl mx-auto">
            {/* SANCTIONED GREEN ACCENT (Innovation page) — green eyebrow */}
            <p
              className="text-xs uppercase font-medium text-[#059669]"
              style={{ letterSpacing: "0.2em" }}
            >
              Innovation
            </p>
            <h1 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-5">
              Build the next generation of surgical instruments with us
            </h1>
            <p className="text-[#475569] text-base md:text-lg leading-relaxed mt-6 max-w-xl mx-auto">
              We partner with surgeons, researchers, and institutions to develop
              instruments that solve real problems in the operating theatre.
            </p>
            {/* SANCTIONED GREEN ACCENT (Innovation page) — green hover on the primary CTA */}
            <a
              href="#proposal"
              className="inline-block mt-8 bg-[#0A1628] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#059669] transition-colors"
            >
              Submit a proposal
            </a>
          </FadeInWhenVisible>

          {/* Image with soft blue radial gradient spotlight */}
          <FadeInWhenVisible delay={0.1} className="relative isolate mt-14 max-w-4xl mx-auto">
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <Image
              src="/images/innovation.png"
              alt="AVM Healthcare innovation"
              width={1200}
              height={799}
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="proposal" className="bg-white py-24 px-6 md:px-8 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <FadeInWhenVisible className="text-center mb-12">
            <h2 className="display-heading text-[#0A1628] text-4xl md:text-5xl">
              Submit a proposal
            </h2>
            <p className="text-[#475569] mt-4 leading-relaxed max-w-xl mx-auto">
              Tell us about your idea — the problem you&rsquo;re solving, the
              product concept, and how you see AVM being involved.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <InnovationForm />
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
