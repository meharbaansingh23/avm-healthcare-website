"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const INSTITUTION_TYPES = [
  "Government Hospital",
  "Private Hospital",
  "Individual/Practitioner",
  "Clinic",
  "Research Institution",
  "Other",
];

export default function CatalogueForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [institution, setInstitution] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/catalogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          address,
          institution,
          institutionType,
          requirements,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setCountry("");
      setAddress("");
      setInstitution("");
      setInstitutionType("");
      setRequirements("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thank you! We&rsquo;ll send the catalogue to your inbox within one
          business day.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rc-name" className="form-label">Name</label>
          <input
            id="rc-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="rc-email" className="form-label">Email</label>
          <input
            id="rc-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rc-phone" className="form-label">Phone</label>
          <input
            id="rc-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="rc-country" className="form-label">Country</label>
          <input
            id="rc-country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rc-address" className="form-label">Address</label>
        <textarea
          id="rc-address"
          rows={3}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-input resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rc-institution" className="form-label">Institution name</label>
          <input
            id="rc-institution"
            required
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="rc-itype" className="form-label">Institution type</label>
          <select
            id="rc-itype"
            required
            value={institutionType}
            onChange={(e) => setInstitutionType(e.target.value)}
            className="form-input"
          >
            <option value="" disabled>Select a type</option>
            {INSTITUTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rc-req" className="form-label">
          Specific requirements <span className="normal-case tracking-normal text-[#94A3B8] font-normal">(optional)</span>
        </label>
        <textarea
          id="rc-req"
          rows={3}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="form-input resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#0A1628] hover:bg-[#0d1f38] text-white py-4 rounded-lg text-sm font-semibold transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting…" : "Request full catalogue"}
      </button>
    </form>
  );
}
