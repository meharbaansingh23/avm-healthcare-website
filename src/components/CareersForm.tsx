"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const AREAS = [
  "Sales & Business Development",
  "Operations & Logistics",
  "Product Management",
  "Medical Affairs",
  "Finance & Administration",
  "Other",
];

export default function CareersForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [cvName, setCvName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const fd = new FormData();
      fd.set("name", name);
      fd.set("email", email);
      fd.set("phone", phone);
      fd.set("city", city);
      fd.set("areaOfInterest", areaOfInterest);
      fd.set("introduction", introduction);
      const file = fileRef.current?.files?.[0];
      if (file) fd.set("cv", file);

      const res = await fetch("/api/careers", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setAreaOfInterest("");
      setIntroduction("");
      setCvName("");
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      aria-busy={status === "submitting"}
    >
      {status === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          Thank you for your interest. We&rsquo;ll review your profile and be in
          touch.
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-name" className="form-label">Name</label>
          <input
            id="c-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="form-label">Email</label>
          <input
            id="c-email"
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
          <label htmlFor="c-phone" className="form-label">Phone</label>
          <input
            id="c-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="c-city" className="form-label">City</label>
          <input
            id="c-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="c-area" className="form-label">Area of interest</label>
        <select
          id="c-area"
          required
          value={areaOfInterest}
          onChange={(e) => setAreaOfInterest(e.target.value)}
          className="form-input"
        >
          <option value="" disabled>Select an area</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-intro" className="form-label">Brief introduction</label>
        <textarea
          id="c-intro"
          rows={5}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Tell us about your background and why you'd like to work with AVM Healthcare"
          className="form-input resize-y"
        />
      </div>

      <div>
        <span id="c-cv-label" className="form-label block">
          Attach your CV (PDF or Word)
        </span>
        <input
          id="c-cv"
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx"
          aria-labelledby="c-cv-label"
          className="sr-only peer"
          onChange={(e) => setCvName(e.target.files?.[0]?.name ?? "")}
        />
        <label
          htmlFor="c-cv"
          className="form-input flex items-center justify-between gap-3 cursor-pointer hover:border-blue-300 peer-focus-visible:border-blue-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-600"
        >
          <span className="text-[#64748B] truncate">
            {cvName || "Choose file…"}
          </span>
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-[0.15em]">
            Browse
          </span>
        </label>
        <p className="text-xs text-[#64748B] italic mt-2">
          Maximum file size 5MB. If upload fails, please email your CV directly
          to{" "}
          <a
            href="mailto:careers@avmhealthcare.com"
            className="text-blue-600 hover:text-blue-700"
          >
            careers@avmhealthcare.com
          </a>
          .
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#0A1628] hover:bg-[#0d1f38] text-white py-4 rounded-lg text-sm font-semibold transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Submitting…" : "Submit expression of interest"}
      </button>
    </form>
  );
}
