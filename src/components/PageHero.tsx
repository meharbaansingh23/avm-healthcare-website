type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
};

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[#F5F5F3] py-24 px-6 border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="w-10 h-0.5 bg-blue-500 mb-6" />
        <p className="text-xs uppercase font-semibold text-blue-600" style={{ letterSpacing: "0.15em" }}>
          {label}
        </p>
        <h1
          className="text-5xl text-[#0A1628] font-bold mt-3 leading-[1.05] tracking-tight"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        <p className="text-[#64748B] text-lg mt-4 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
