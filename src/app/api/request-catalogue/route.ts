import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: switch to noreply@avmhealthcare.com once domain is verified in Resend
const FROM = "AVM Healthcare <onboarding@resend.dev>";
// TODO: switch to info@avmhealthcare.com once domain is verified
const TO = "meharbaansinghkaila@gmail.com";

const escape = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

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

    const fields: Array<[string, string]> = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["Country", country],
      ["Address", address || "—"],
      ["Institution", institution],
      ["Institution type", institutionType],
      ["Specific requirements", requirements || "—"],
    ];

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #0A1628; max-width: 600px;">
        <h2 style="margin: 0 0 16px;">New catalogue request</h2>
        ${fields
          .map(
            ([k, v]) =>
              `<p style="margin: 8px 0;"><strong>${k}:</strong> ${escape(v).replace(/\n/g, "<br>")}</p>`
          )
          .join("")}
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;">
        <p style="color: #666; font-size: 12px;">Sent from avmhealthcare.com</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
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
