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

          {/* RIGHT — Portrait image */}
          <FadeInWhenVisible delay={0.1} className="lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] w-full bg-[#F1F5F9] shadow-lg border border-[#E2E8F0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/request/cover.png"
                alt="AVM Healthcare Product Catalogue"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <p className="text-xs text-[#94A3B8] text-center mt-3">
              AVM Healthcare Products · Full Surgical Instruments Catalogue
            </p>
          </FadeInWhenVisible>
        </div>
      </div>
    </div>
  );
}
