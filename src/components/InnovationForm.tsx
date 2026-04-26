"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const PROPOSAL_TYPES = [
  "New product concept",
  "Manufacturing partnership",
  "Research collaboration",
  "Technology licensing",
  "Other",
];

function SuccessState({ message }: { message: string }) {
  return (
    <div className="text-center py-12" role="status" aria-live="polite">
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="mx-auto"
      >
        <circle cx="28" cy="28" r="28" fill="#2563EB" />
        <path
          d="M19 28l6 6 12-12"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="text-xl font-semibold text-[#0A1628] mt-6">Thank you</h3>
      <p className="text-[#64748B] mt-2 max-w-sm mx-auto leading-relaxed">{message}</p>
    </div>
  );
}

export default function InnovationForm() {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [proposalType, setProposalType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/innovation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          organisation,
          email,
          phone,
          proposalType,
          description,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) {
        throw new Error(data.error || "");
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or email us directly at info@avmhealthcare.com."
      );
    }
  }

  if (status === "success") {
    return (
      <SuccessState message="We've received your proposal. We'll be in touch soon." />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      aria-busy={status === "submitting"}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="i-name" className="form-label">Name</label>
          <input
            id="i-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="i-org" className="form-label">Organisation</label>
          <input
            id="i-org"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="i-email" className="form-label">Email</label>
          <input
            id="i-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="i-phone" className="form-label">Phone</label>
          <input
            id="i-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="i-type" className="form-label">Nature of proposal</label>
        <select
          id="i-type"
          required
          value={proposalType}
          onChange={(e) => setProposalType(e.target.value)}
          className="form-input"
        >
          <option value="" disabled>Select a type</option>
          {PROPOSAL_TYPES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="i-desc" className="form-label">Describe your idea</label>
        <textarea
          id="i-desc"
          rows={6}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Give us an overview of what you have in mind — the problem you're solving, the product concept, and how you see AVM being involved."
          className="form-input resize-y"
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#0A1628] hover:bg-[#0d1f38] text-white py-4 rounded-lg text-sm font-semibold transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Submit proposal"}
      </button>
    </form>
  );
}
