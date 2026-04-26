import Image from "next/image";
import InnovationForm from "@/components/InnovationForm";

export const metadata = {
  title: "Innovation — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Collaborate with AVM Healthcare on new product concepts, manufacturing partnerships, research, and technology licensing.",
};

export default function InnovationPage() {
  return (
    <>
      {/* HERO — two column on desktop, stacked on mobile */}
      <section className="bg-white pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — text */}
          <div>
            <p
              className="text-xs uppercase font-semibold text-blue-600 mb-5"
              style={{ letterSpacing: "0.15em" }}
            >
              Innovation
            </p>
            <h1
              className="font-semibold text-4xl md:text-5xl text-[#0A1628] tracking-[-0.03em] leading-[1.05]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Build the next generation of surgical instruments with us
            </h1>
            <p className="text-[#64748B] text-base md:text-lg leading-relaxed mt-6 max-w-md">
              We partner with surgeons, researchers, and institutions to
              develop instruments that solve real problems in the operating
              theatre.
            </p>
            <a
              href="#proposal"
              className="inline-block mt-8 bg-[#0A1628] text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[#0d1f38] transition-colors"
            >
              Submit a proposal
            </a>
          </div>

          {/* RIGHT — image with soft blue radial gradient spotlight */}
          <div className="relative isolate">
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
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="proposal" className="bg-white py-24 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-semibold text-4xl text-[#0A1628] tracking-[-0.03em] leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Submit a proposal
            </h2>
            <p className="text-[#64748B] mt-4 leading-relaxed">
              Tell us about your idea — the problem you&rsquo;re solving, the
              product concept, and how you see AVM being involved.
            </p>
          </div>
          <InnovationForm />
        </div>
      </section>
    </>
  );
}
