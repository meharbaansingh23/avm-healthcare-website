import FadeInWhenVisible from "@/components/FadeInWhenVisible";

type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
};

export default function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[#FAFAF9] py-20 md:py-28 px-6 md:px-8 border-b border-[#E2E8F0]">
      <FadeInWhenVisible className="max-w-3xl mx-auto text-center">
        <div className="w-12 h-px bg-blue-600 mx-auto mb-8" />
        <p className="section-label">{label}</p>
        <h1 className="display-heading text-[#0A1628] text-5xl md:text-7xl mt-4">
          {title}
        </h1>
        <p className="text-[#475569] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </FadeInWhenVisible>
    </section>
  );
}
