import ContactForm from "@/components/ContactForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "Contact — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Get in touch with AVM Healthcare. Our New Delhi team is available Monday to Saturday, 9:30am–6:30pm IST.",
};

const offices = [
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
    address: "Hans-Henny-Jahnn-Weg 53, 22085 Hamburg, Germany",
    maps: "https://maps.app.goo.gl/x6ej4DSTVWZViqKo9",
  },
];

export default function ContactPage() {
  return (
    <section className="bg-white pt-20 pb-24 md:pt-24 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <FadeInWhenVisible className="text-center max-w-3xl mx-auto">
          <p className="section-label">Contact us</p>
          <h1 className="text-[#0A1628] text-6xl md:text-8xl font-bold tracking-tighter leading-[1.05] mt-4">
            Get In Touch
          </h1>
          <p className="text-[#475569] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
            Our team is based in New Delhi and is available Monday to Saturday,
            9:30am to 6:30pm IST.
          </p>
        </FadeInWhenVisible>

        {/* Offices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {offices.map((office, i) => (
            <FadeInWhenVisible key={office.name} delay={i * 0.1} className="h-full">
              <div className="h-full bg-white border border-[#E2E8F0] rounded-2xl p-7 text-center flex flex-col items-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-200">
                <p
                  className="text-xs font-semibold uppercase text-blue-600 mb-3"
                  style={{ letterSpacing: "0.15em" }}
                >
                  {office.name}
                </p>
                <p className="text-sm text-[#0A1628] leading-relaxed font-medium flex-1">
                  {office.address}
                </p>
                {office.maps && (
                  <a
                    href={office.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 mt-4"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Contact details */}
        <FadeInWhenVisible delay={0.1} className="mt-12 flex flex-wrap items-start justify-center gap-x-16 gap-y-8 text-center">
          <div>
            <p
              className="text-xs uppercase text-[#475569] font-semibold mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Email
            </p>
            <a
              href="mailto:info@avmhealthcare.com"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              info@avmhealthcare.com
            </a>
          </div>
          <div>
            <p
              className="text-xs uppercase text-[#475569] font-semibold mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Working hours
            </p>
            <p className="text-sm text-[#0A1628]">
              Monday – Saturday · 9:30 am – 6:30 pm IST
            </p>
          </div>
          <div>
            <p
              className="text-xs uppercase text-[#475569] font-semibold mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
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
        </FadeInWhenVisible>

        {/* Form */}
        <FadeInWhenVisible delay={0.1} className="mt-20 max-w-2xl mx-auto">
          <ContactForm />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
