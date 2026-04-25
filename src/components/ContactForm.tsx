"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, organisation, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setOrganisation("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="font-serif text-2xl text-[#0A1628] font-bold mb-2">
        Send us a message
      </h2>

      {status === "success" && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thank you! We&rsquo;ll be in touch within one business day.
        </div>
      )}
      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="organisation" className="form-label">Organisation</label>
        <input
          id="organisation"
          name="organisation"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="form-input resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#0A1628] hover:bg-[#0d1f38] text-white py-4 rounded-lg text-sm font-semibold transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
