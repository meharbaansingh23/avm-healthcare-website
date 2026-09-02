import ContactForm from "@/components/ContactForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import PillButton from "@/components/PillButton";
import { getSiteSettings } from "@/lib/sanity-queries";

// Fallback for when siteSettings.whatsappNumber hasn't been set in Sanity
// yet, same pattern as the certificationWording fallback on the homepage.
const DEFAULT_WHATSAPP_NUMBER = "919810345155";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AVM Healthcare. Offices in New Delhi, Mumbai, and Hamburg. Working hours Monday–Saturday, 9:30am–6:30pm IST.",
  alternates: {
    canonical: "https://avmhealthcare.com/contact",
  },
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

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappNumber = settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;

  return (
    <section className="bg-white pt-20 pb-24 md:pt-24 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <FadeInWhenVisible className="text-center max-w-3xl mx-auto">
          <p className="section-label">Contact us</p>
          <h1 className="text-[#0A1628] text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mt-4">
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
                  <div className="mt-4">
                    <PillButton href={office.maps} external size="sm">
                      View on Google Maps
                    </PillButton>
                  </div>
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
              Phone
            </p>
            <a
              href="tel:+919810345155"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              +91 98103 45155
            </a>
          </div>
          <div>
            <p
              className="text-xs uppercase text-[#475569] font-semibold mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              Email
            </p>
            <a
              href="mailto:sales@avmhealthcare.com"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              sales@avmhealthcare.com
            </a>
          </div>
          <div>
            <p
              className="text-xs uppercase text-[#475569] font-semibold mb-2"
              style={{ letterSpacing: "0.15em" }}
            >
              WhatsApp
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.15 8.15 0 0 1-1.25-4.38c0-4.51 3.67-8.18 8.19-8.18 2.19 0 4.24.85 5.79 2.41a8.13 8.13 0 0 1 2.4 5.78c0 4.51-3.68 8.23-8.14 8.23zm4.48-6.13c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29z" />
              </svg>
              Message us
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
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/avm-health-care-5571711b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/avm.healthcare.5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Divider — breaks up the run from the contact details into the form */}
        <div className="w-20 h-px bg-[#2563EB]/50 mx-auto mt-16" aria-hidden />

        {/* Form */}
        <FadeInWhenVisible delay={0.1} className="mt-16 max-w-2xl mx-auto">
          <ContactForm />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
