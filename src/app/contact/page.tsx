import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Get in touch with AVM Healthcare. Our New Delhi team is available Monday to Saturday, 9:30am–6:30pm IST.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact us"
        title="Get in touch"
        subtitle="Our team is based in New Delhi and is available Monday to Saturday, 9:30am to 6:30pm IST."
      />

      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="section-label">Our office</p>
            <h2
              className="font-serif text-3xl text-[#0A1628] font-semibold mt-6 leading-tight tracking-[-0.03em]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Visit or reach us
            </h2>

            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#64748B] font-semibold mb-2">
                  Address
                </p>
                <p className="text-sm text-[#0A1628] leading-relaxed">
                  17-19 A Block Chhatarpur Extension, Rajpur Road,<br />
                  New Delhi — 110074, India
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#64748B] font-semibold mb-2">
                  Email
                </p>
                <a
                  href="mailto:info@avmhealthcare.com"
                  className="text-sm text-blue-600 hover:text-blue-700 leading-relaxed"
                >
                  info@avmhealthcare.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#64748B] font-semibold mb-2">
                  Working hours
                </p>
                <p className="text-sm text-[#0A1628] leading-relaxed">
                  Monday – Saturday · 9:30 am – 6:30 pm IST
                </p>
              </div>
            </div>

            {/* TODO: Replace with real image */}
            <div className="img-placeholder h-56 w-full mt-10">
              Office / location image
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
