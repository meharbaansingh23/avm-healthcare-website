type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
};

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[#0A1628] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="w-10 h-0.5 bg-blue-500 mb-6" />
        <p className="text-xs uppercase tracking-[0.15em] font-semibold text-blue-400">
          {label}
        </p>
        <h1
          className="font-serif text-5xl text-white mt-2 leading-[1.05]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {title}
        </h1>
        <p className="text-white/60 text-lg mt-4 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
