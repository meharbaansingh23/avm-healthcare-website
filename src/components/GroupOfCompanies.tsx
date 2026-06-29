import FadeInWhenVisible from "@/components/FadeInWhenVisible";

type Company = {
  name: string;
  sub: string;
  logo:
    | { type: "text"; value: string }
    | { type: "img"; src: string; alt: string };
  href?: string;
};

const COMPANIES: Company[] = [
  {
    name: "AVM Healthcare Products",
    sub: "Parent company",
    logo: {
      type: "img",
      src: "/images/logo-dark.png",
      alt: "AVM Healthcare Products",
    },
  },
  {
    name: "AVM Surgicare",
    sub: "Surgical solutions",
    // TODO: Replace AVM Surgicare logo when client provides corrected version
    logo: {
      type: "img",
      src: "/images/companies/AVM-Surgicare.png",
      alt: "AVM Surgicare",
    },
  },
  {
    name: "ANI Instruments",
    sub: "German precision · animedtec.com",
    logo: {
      type: "img",
      src: "/images/companies/ANI.png",
      alt: "ANI Instruments",
    },
    href: "https://www.animedtec.com/",
  },
  {
    name: "AceWeise",
    sub: "Surgical solutions",
    logo: {
      type: "img",
      src: "/images/companies/aceweise.jpeg",
      alt: "AceWeise",
    },
  },
];

export default function GroupOfCompanies() {
  return (
    <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top row — centered */}
        <FadeInWhenVisible className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label">Our group</p>
          <h2 className="display-heading text-[#0A1628] text-4xl md:text-6xl mt-4">
            Part Of A Larger Family
          </h2>
          <p className="text-sm text-[#475569] mt-5 leading-relaxed">
            AVM Healthcare is part of a group of companies united by a shared
            commitment to advancing surgical care.
          </p>
        </FadeInWhenVisible>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANIES.map((c, i) => {
            const cardClasses =
              "h-full bg-white rounded-2xl border border-[#E2E8F0] p-8 flex flex-col items-center text-center hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group";

            const inner = (
              <>
                <div className="h-16 w-full flex items-center justify-center">
                  {c.logo.type === "text" ? (
                    <span className="font-medium text-2xl text-[#0A1628] tracking-tight">
                      {c.logo.value}
                    </span>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.logo.src}
                        alt={c.logo.alt}
                        className={
                          c.name === "ANI Instruments"
                            ? "scale-[1.35] transition-transform duration-200 group-hover:scale-[1.42]"
                            : "transition-transform duration-200 group-hover:scale-105"
                        }
                        style={{
                          maxHeight: "48px",
                          maxWidth: "140px",
                          width: "auto",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="border-t border-[#E2E8F0] mt-6 pt-6 w-full">
                  <div className="text-sm font-semibold text-[#0A1628] group-hover:text-blue-600 transition-colors">
                    {c.name}
                    {c.href && (
                      <span className="text-blue-600 text-xs ml-1" aria-hidden>
                        ↗
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">{c.sub}</div>
                </div>
              </>
            );

            return (
              <FadeInWhenVisible key={c.name} delay={(i % 4) * 0.1} className="h-full">
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClasses}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className={cardClasses}>{inner}</div>
                )}
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
}
