import CatalogueForm from "@/components/CatalogueForm";

export const metadata = {
  title: "Request Catalogue — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Request the AVM Healthcare product catalogue — over 3,400 surgical instruments across 6 specialties, delivered within one business day.",
};

export default function RequestCataloguePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — Form */}
          <div>
            <p className="text-xs uppercase tracking-[0.12em] font-medium text-blue-600 mb-3">
              Request Catalogue
            </p>
            <h1 className="text-4xl font-semibold text-[#0A1628] tracking-[-0.03em] leading-tight mb-3">
              Get our detailed product catalogue
            </h1>
            <p className="text-[#64748B] text-sm leading-relaxed mb-10">
              Fill in your details and our team will send you the full catalogue within one business day.
            </p>
            <CatalogueForm />
          </div>

          {/* RIGHT — Portrait image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] w-full bg-[#F1F5F9] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/catalogue-cover.jpg"
                alt="AVM Healthcare Product Catalogue"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* TODO: Add catalogue cover image at public/images/catalogue-cover.jpg, then delete the fallback overlay below */}
              <div className="absolute inset-0 flex items-center justify-center text-[#CBD5E1] text-xs uppercase tracking-widest">
                Catalogue cover
              </div>
            </div>
            <p className="text-xs text-[#94A3B8] text-center mt-3">
              AVM Healthcare Products · Full Surgical Instruments Catalogue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
