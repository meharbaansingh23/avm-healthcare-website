import PageHero from "@/components/PageHero";
import InnovationForm from "@/components/InnovationForm";

export const metadata = {
  title: "Innovation — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Collaborate with AVM Healthcare on new product concepts, manufacturing partnerships, research, and technology licensing.",
};

export default function InnovationPage() {
  return (
    <>
      <PageHero
        label="Innovation"
        title="Collaborate with us"
        subtitle="AVM Healthcare is open to partnerships and collaborative product development in the medical devices space."
      />

      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* TODO: Replace with real image */}
            <div className="img-placeholder h-56">Innovation / R&amp;D image</div>
            {/* TODO: Replace with real image */}
            <div className="img-placeholder h-56">Innovation / R&amp;D image</div>
          </div>
          <p className="font-serif italic text-xl text-[#64748B] leading-relaxed text-center mt-12">
            We work directly with surgeons, researchers, and institutions to
            develop instruments that solve real problems in the operating
            theatre.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F3] py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-serif text-3xl text-[#0A1628] font-bold leading-tight mb-8"
            style={{ letterSpacing: "-0.03em" }}
          >
            Submit a proposal
          </h2>
          <InnovationForm />
        </div>
      </section>
    </>
  );
}
