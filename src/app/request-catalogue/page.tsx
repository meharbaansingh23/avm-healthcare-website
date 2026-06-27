import Image from "next/image";
import CatalogueForm from "@/components/CatalogueForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "Request Catalogue — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Request the AVM Healthcare product catalogue — over 3,400 surgical instruments across 6 specialties, delivered within one business day.",
};

export default function RequestCataloguePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Two-column layout retained — form-focused page exception to the centered rule */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Form */}
          <FadeInWhenVisible>
            <p className="section-label mb-3">Request Catalogue</p>
            <h1 className="text-[#0A1628] text-4xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-4">
              Get Our Detailed Product Catalogue
            </h1>
            <p className="text-[#475569] text-sm leading-relaxed mb-10">
              Fill in your details and our team will send you the full catalogue
              within one business day.
            </p>
            <CatalogueForm />
          </FadeInWhenVisible>

          {/* RIGHT — Portrait catalogue cover */}
          {/* TODO: Replace with client-provided catalogue cover image when available */}
          <FadeInWhenVisible delay={0.1} className="lg:sticky lg:top-24">
            <div
              className="rounded-2xl overflow-hidden aspect-[3/4] w-full shadow-lg border border-[#E2E8F0] flex flex-col items-center justify-center text-center px-8"
              style={{ background: "linear-gradient(160deg, #0A1628 0%, #1E293B 100%)" }}
            >
              <Image
                src="/images/logo-light.png"
                alt="AVM Healthcare Products"
                width={1015}
                height={251}
                priority
                className="h-12 w-auto"
              />
              <p className="text-xs uppercase tracking-widest text-white/70 mt-8">
                Product Catalogue 2026
              </p>
              <p className="text-lg text-white mt-3">AVM Healthcare Products</p>
              <p className="text-xs text-white/50 mt-2">
                Surgical Instruments · Made In India · Since 1996
              </p>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  );
}
