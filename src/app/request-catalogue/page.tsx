import Image from "next/image";
import CatalogueForm from "@/components/CatalogueForm";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata = {
  title: "Request Catalogue",
  description:
    "Request AVM Healthcare's detailed product catalogue. Over 10,000 surgical products across multiple specialties, delivered to your inbox within one business day.",
  alternates: {
    canonical: "https://avmhealthcare.com/request-catalogue",
  },
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

          {/* RIGHT — Catalogue cover */}
          <FadeInWhenVisible delay={0.1} className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden aspect-[2251/3184] w-full shadow-lg border border-[#E2E8F0]">
              <Image
                src="/images/catalogue_cover_page.webp"
                alt="AVM Healthcare Products — Full Surgical Instruments Catalogue"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <p className="mt-3 text-center text-xs text-[#94A3B8]">
              AVM Healthcare Products · Full Surgical Instruments Catalogue
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  );
}
