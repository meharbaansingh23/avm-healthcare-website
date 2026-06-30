import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AVM Innovation <innovation@send.avmhealthcare.com>";
const toEmails = (process.env.RESEND_TO_EMAIL || "info@avmhealthcare.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

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

    const fields: Array<[string, string]> = [
      ["Name", name],
      ["Organisation", organisation || "—"],
      ["Email", email],
      ["Phone", phone || "—"],
      ["Nature of proposal", proposalType],
      ["Description", description],
    ];

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #0A1628; max-width: 600px;">
        <h2 style="margin: 0 0 16px;">New innovation proposal</h2>
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
