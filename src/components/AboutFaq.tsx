"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// Design decision: the section heading is centered (global rule), but the
// question/answer text stays left-aligned for readability — centred accordion
// rows with a toggle read awkwardly. Matches the Ramp/Resend FAQ treatment.
export default function AboutFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen
                ? "border-[#DBEAFE] bg-white"
                : "border-[#E2E8F0] bg-white hover:border-blue-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex justify-between items-center gap-4 text-left px-6 py-5 cursor-pointer"
            >
              <h3
                className={`text-sm font-semibold transition-colors ${
                  isOpen ? "text-blue-600" : "text-[#0A1628]"
                }`}
              >
                {item.q}
              </h3>
              <span
                className={`shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45 text-blue-600" : "text-[#94A3B8]"
                }`}
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                  <path d="M8 2v12M2 8h12" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-sm text-[#475569] leading-relaxed px-6 pb-5">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
