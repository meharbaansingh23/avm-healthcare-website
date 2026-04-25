import PageHero from "@/components/PageHero";
import CatalogueForm from "@/components/CatalogueForm";

export const metadata = {
  title: "Request Catalogue — AVM Healthcare Products Pvt. Ltd.",
  description:
    "Request the AVM Healthcare product catalogue — over 3,400 surgical instruments across 6 specialties, delivered within one business day.",
};

export default function RequestCataloguePage() {
  return (
    <>
      <PageHero
        label="Request catalogue"
        title="Get our detailed product catalogue"
        subtitle="Fill in your details and our team will send you the full catalogue within one business day."
      />

      <section className="bg-white py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#64748B] text-sm leading-relaxed mb-10">
            We supply over 3,400 surgical instruments across 6 specialties.
            Please share your details below and we will send the full catalogue
            directly to your inbox.
          </p>
          <CatalogueForm />
        </div>
      </section>
    </>
  );
}
