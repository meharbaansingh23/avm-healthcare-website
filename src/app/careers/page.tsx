import PageHero from "@/components/PageHero";
import CareersForm from "@/components/CareersForm";

export const metadata = {
  title: "Careers — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Join AVM Healthcare. We are always looking for driven people who care about advancing surgical care.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Join the AVM Healthcare team"
        subtitle="We are always looking for driven people who care about advancing surgical care."
      />

      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-2xl text-[#64748B] leading-relaxed">
            We don&rsquo;t have specific openings listed right now — but
            we&rsquo;re always interested in meeting talented people. If you
            care about healthcare and want to make a difference, send us your
            profile.
          </p>
        </div>
      </section>

      <section className="bg-[#F5F5F3] py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <h2
            className="font-serif text-3xl text-[#0A1628] font-semibold leading-tight tracking-[-0.03em]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Express your interest
          </h2>
          <p className="text-[#64748B] text-sm mt-2 mb-10 leading-relaxed">
            Tell us a bit about yourself and what you&rsquo;d like to bring to
            AVM. We&rsquo;ll keep your profile on file and reach out when a
            suitable opportunity opens up.
          </p>
          <CareersForm />
        </div>
      </section>
    </>
  );
}
