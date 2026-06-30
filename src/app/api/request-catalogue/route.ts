import { Resend } from "resend";
import { renderFormSubmissionEmail } from "@/emails/FormSubmissionEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AVM Healthcare <catalogue@send.avmhealthcare.com>";
const toEmails = (process.env.RESEND_TO_EMAIL || "info@avmhealthcare.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const country = String(body.country ?? "").trim();
    const address = String(body.address ?? "").trim();
    const institution = String(body.institution ?? "").trim();
    const institutionType = String(body.institutionType ?? "").trim();
    const requirements = String(body.requirements ?? "").trim();

    // Server-side validation
    if (!name || !email || !phone || !country || !institution || !institutionType) {
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
      { label: "Email", value: email },
      { label: "Phone", value: phone },
      { label: "Country", value: country },
      { label: "Address", value: address || "—" },
      { label: "Institution", value: institution },
      { label: "Institution type", value: institutionType },
      { label: "Specific requirements", value: requirements || "—" },
    ];

    const html = renderFormSubmissionEmail({
      title: "New catalogue request",
      submitterName: name,
      submitterEmail: email,
      fields,
    });

    const { error } = await resend.emails.send({
      from: FROM,
      to: toEmails,
      replyTo: email,
      subject: `New catalogue request from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error (request-catalogue):", error);
      return Response.json(
        { success: false, error: "Failed to send. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Request-catalogue route error:", err);
    return Response.json(
      { success: false, error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
