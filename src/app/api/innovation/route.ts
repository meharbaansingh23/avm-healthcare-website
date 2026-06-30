import { Resend } from "resend";
import { renderFormSubmissionEmail } from "@/emails/FormSubmissionEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AVM Innovation <innovation@send.avmhealthcare.com>";
const toEmails = (process.env.RESEND_TO_EMAIL || "info@avmhealthcare.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const organisation = String(body.organisation ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const proposalType = String(body.proposalType ?? "").trim();
    const description = String(body.description ?? "").trim();

    // Server-side validation
    if (!name || !email || !proposalType || !description) {
      return Response.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return Response.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const fields = [
      { label: "Name", value: name },
      { label: "Organisation", value: organisation || "—" },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "—" },
      { label: "Nature of proposal", value: proposalType },
      { label: "Description", value: description },
    ];

    const html = renderFormSubmissionEmail({
      title: "New innovation proposal",
      submitterName: name,
      submitterEmail: email,
      fields,
    });

    const { error } = await resend.emails.send({
      from: FROM,
      to: toEmails,
      replyTo: email,
      subject: `New innovation proposal from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error (innovation):", error);
      return Response.json(
        { success: false, error: "Failed to send. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Innovation route error:", err);
    return Response.json(
      { success: false, error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
