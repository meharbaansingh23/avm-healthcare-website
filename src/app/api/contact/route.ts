import { Resend } from "resend";
import { renderFormSubmissionEmail } from "@/emails/FormSubmissionEmail";
import { sanityWriteClient } from "@/lib/sanity-write";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, organisation, message } = await request.json();

    const fields = [
      { label: "Name", value: String(name ?? "") },
      { label: "Email", value: String(email ?? "") },
      { label: "Phone", value: String(phone ?? "") },
      { label: "Organisation", value: String(organisation ?? "") },
      { label: "Message", value: String(message ?? "") },
    ];

    const html = renderFormSubmissionEmail({
      title: "New contact form submission",
      submitterName: name,
      submitterEmail: email,
      fields,
    });

    const toEmails = (process.env.RESEND_TO_SALES || "sales@avmhealthcare.com")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const { error } = await resend.emails.send({
      from: "AVM Healthcare <contact@send.avmhealthcare.com>",
      to: toEmails,
      subject: `New Contact Enquiry — ${name ?? "Unknown"}`,
      html,
      replyTo: email,
    });

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    try {
      await sanityWriteClient.create({
        _type: "contactSubmission",
        name: String(name ?? ""),
        email: String(email ?? ""),
        phone: String(phone ?? ""),
        message: String(message ?? ""),
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    } catch (sanityError) {
      console.error("Sanity write failed (contact):", sanityError);
    }

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
