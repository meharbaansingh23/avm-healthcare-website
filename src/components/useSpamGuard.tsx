"use client";

import { useEffect, useRef, useState } from "react";
import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "@/lib/spam-guard";

/**
 * Client half of the bot filter (see src/lib/spam-guard.ts).
 * Render `honeypotField` inside the <form>, and merge `spamFields()` into
 * the request body (JSON) or call it per key for FormData.
 */
export function useSpamGuard(idPrefix: string) {
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const spamFields = () => ({
    [HONEYPOT_FIELD]: honeypot,
    [STARTED_AT_FIELD]: String(startedAt.current),
  });

  const inputId = `${idPrefix}-company-website`;
  const honeypotField = (
    // Hidden from people and assistive tech; bots fill it in.
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={inputId}>Company website</label>
      <input
        id={inputId}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
    </div>
  );

  return { honeypotField, spamFields };
}
