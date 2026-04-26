"use client";

import { useState } from "react";

const FAQ_ITEMS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: "Do you supply to individual doctors or only institutions?",
    a: "We primarily supply to hospitals, surgical centres, government procurement agencies, and distributors. Individual practitioners may contact us to discuss their requirements directly.",
  },
  {
    q: "How can I request a product catalogue?",
    a: "You can request our full product catalogue through the Request Catalogue page on this website. Our team will send it to your inbox within one business day.",
  },
  {
    q: "Do you export outside India?",
    a: "Yes. We export to international markets and have an established presence through our German partner, ANI Medizintechnik GmbH, based in Hamburg.",
  },
  {
    q: "Are your products CE and ISO certified?",
    a: "Yes. All AVM products are CE certified, ISO compliant, and FDA registered. Quality is monitored at every stage of manufacturing.",
  },
  {
    q: "Can instruments be customised to specific requirements?",
    a: "Absolutely. We offer customisation based on the specific needs of individual surgeons and institutions — from dimensions to materials and finishes.",
  },
  {
    q: "What is your delivery timeline?",
    a: (
      <>
        Delivery timelines vary based on product and location. Please contact us
        directly at{" "}
        <a
          href="mailto:info@avmhealthcare.com"
          className="text-blue-600 hover:text-blue-700"
        >
          info@avmhealthcare.com
        </a>{" "}
        for specific delivery information.
      </>
    ),
  },
  {
    q: "How do I get after-sales service and support?",
    a: (
      <>
        We offer 24×7 service support. Contact our team at{" "}
        <a
          href="mailto:info@avmhealthcare.com"
          className="text-blue-600 hover:text-blue-700"
        >
          info@avmhealthcare.com
        </a>{" "}
        or call our New Delhi office for assistance.
      </>
    ),
  },
  {
    q: "Do you work with government hospitals?",
    a: "Yes. We supply to government institutions across India through both direct supply agreements and government procurement programs.",
  },
];

export default function AboutFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className="border-b border-[#E2E8F0] py-5 cursor-pointer group"
            onClick={() => setOpenIndex(isOpen ? null : i)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpenIndex(isOpen ? null : i);
              }
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-sm font-semibold text-[#0A1628] group-hover:text-blue-600 transition-colors">
                {item.q}
              </h3>
              <span
                className="text-[#94A3B8] text-lg leading-none shrink-0 mt-0.5"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </div>
            <div
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? "320px" : "0px" }}
            >
              <p className="text-sm text-[#64748B] leading-relaxed mt-3">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
