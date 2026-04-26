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
    logo: { type: "text", value: "AVM" },
  },
  {
    name: "AVM Surgicare",
    sub: "Surgical solutions",
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
    name: "Chaba Mediwise",
    sub: "Healthcare products",
    logo: {
      type: "img",
      src: "/images/companies/CHABA-MEDWISE.png",
      alt: "Chaba Mediwise",
    },
  },
];

export default function GroupOfCompanies() {
  return (
    <section className="bg-[#F5F5F3] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16">
          <div>
            <p
              className="text-xs uppercase font-medium text-blue-600"
              style={{ letterSpacing: "0.12em" }}
            >
              Our group
            </p>
            <h2 className="text-4xl font-semibold text-[#0A1628] tracking-[-0.03em] mt-2">
              Part of a larger family
            </h2>
          </div>
          <p className="text-sm text-[#64748B] max-w-xs md:text-right leading-relaxed">
            AVM Healthcare is part of a group of companies united by a shared
            commitment to advancing surgical care.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANIES.map((c) => {
            const cardClasses =
              "bg-white rounded-2xl border border-[#E2E8F0] p-8 flex flex-col hover:shadow-md hover:border-blue-200 transition-all duration-200 group";

            const inner = (
              <>
                <div className="h-16 flex items-center">
                  {c.logo.type === "text" ? (
                    <span className="font-semibold text-2xl text-[#0A1628] tracking-tight">
                      {c.logo.value}
                    </span>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.logo.src}
                        alt={c.logo.alt}
                        style={{
                          height: "48px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="border-t border-[#F1F5F9] mt-6 pt-6">
                  <div className="text-sm font-semibold text-[#0A1628] group-hover:text-blue-600 transition-colors">
                    {c.name}
                    {c.href && (
                      <span className="text-blue-400 text-xs ml-1" aria-hidden>
                        ↗
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#94A3B8] mt-1">{c.sub}</div>
                </div>
              </>
            );

            return c.href ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClasses}
              >
                {inner}
              </a>
            ) : (
              <div key={c.name} className={cardClasses}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
