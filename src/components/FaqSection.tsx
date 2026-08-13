import JsonLd from "./schema/JsonLd";

/**
 * FAQ section with matching FAQPage schema.
 *
 * Built on <details>/<summary> so it works without JavaScript, which matters
 * because Google must see the answer text in the initial HTML for the schema
 * to be eligible. Any accordion that hides answers behind client-side state
 * risks the answers not being crawled.
 *
 * ANSWERS BELOW ARE PLACEHOLDERS pending confirmation from Nisha. Publishing
 * FAQPage schema with invented answers is worse than shipping no FAQ at all.
 */

type Faq = { question: string; answer: string };

const faqs: Faq[] = [
  {
    question: "How long does it take to receive a quotation?",
    answer:
      "PLACEHOLDER — confirm turnaround with Nisha. e.g. Quotations are issued within one business day of receiving an enquiry.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer: "PLACEHOLDER — confirm MOQ policy, and whether it differs for repeat orders.",
  },
  {
    question: "Can instruments be customised to a specific requirement?",
    answer:
      "PLACEHOLDER — confirm the customisation process, typical lead time and whether there is a minimum quantity for custom work.",
  },
  {
    question: "What certifications does AVM hold?",
    answer:
      "PLACEHOLDER — do not publish until certificate scopes are confirmed. Note that 'FDA certified' is not a valid claim for Class I exempt devices; 'FDA registered' is the correct wording.",
  },
  {
    question: "Does AVM export, and to which markets?",
    answer: "PLACEHOLDER — confirm export markets and who handles documentation and shipping.",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#2563EB]">
        Common Questions
      </p>
      <h2 className="mb-10 text-3xl font-semibold tracking-tight text-[#0A1628] sm:text-4xl">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-[#0A1628] [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none text-[#2563EB] transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 pr-8 leading-relaxed text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </section>
  );
}
