import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Get in touch with AVM Healthcare. Our New Delhi team is available Monday to Saturday, 9:30am–6:30pm IST.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-white pt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div className="lg:col-span-2">
            <p className="section-label">Contact us</p>
            <h1
              className="text-5xl text-[#0A1628] font-semibold mt-3 leading-[1.05] tracking-[-0.03em]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Get in touch
            </h1>
            <p className="text-[#64748B] text-lg mt-4 max-w-xl leading-relaxed">
              Our team is based in New Delhi and is available Monday to Saturday, 9:30am to 6:30pm IST.
            </p>
          </div>

          <div>
            <p className="section-label">Our office</p>
            <h2
              className="font-serif text-3xl text-[#0A1628] font-semibold mt-6 leading-tight tracking-[-0.03em]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Visit or reach us
            </h2>

            <div className="mt-10">
              {[
                {
                  name: "New Delhi — Registered Office",
                  address:
                    "17-19 A Block Chatarpur Extension, Rajpur Road, New Delhi — 110074, India",
                  maps: "https://maps.app.goo.gl/ypyPSd5SSeybPpA1A",
                },
                {
                  name: "Mumbai — Corporate Office",
                  address:
                    "1403, 14th Floor, Peninsula Park, Off Link Road, Andheri West, Mumbai — 400083, India",
                  maps: null,
                },
                {
                  name: "Hamburg — ANI Medizintechnik GmbH",
                  address:
                    "Hans-Henny-Jahnn-Weg 53, 22085 Hamburg, Germany",
                  maps: "https://maps.app.goo.gl/x6ej4DSTVWZViqKo9",
                },
              ].map((office) => (
                <div
                  key={office.name}
                  className="border-b border-[#E2E8F0] pb-6 mb-6 last:border-0 last:mb-0"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    {office.name}
                  </p>
                  <p className="text-sm text-[#0A1628] leading-relaxed font-medium">
                    {office.address}
                  </p>
                  {office.maps && (
                    <a
                      href={office.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 mt-2"
                    >
                      View on Google Maps →
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-8">
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
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-2">
                  Follow us
                </p>
                <a
                  href="https://www.linkedin.com/company/avm-healthcare-products-pvt-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
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
