import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: switch to noreply@avmhealthcare.com once domain is verified in Resend
const FROM = "AVM Healthcare <onboarding@resend.dev>";
// TODO: switch to info@avmhealthcare.com once domain is verified
const TO = "meharbaansinghkaila@gmail.com";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const escape = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const areaOfInterest = String(formData.get("areaOfInterest") ?? "").trim();
    const introduction = String(formData.get("introduction") ?? "").trim();
    const cv = formData.get("cv");

    // Server-side validation
    if (!name || !email || !areaOfInterest) {
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

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (cv && cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_FILE_SIZE) {
        return Response.json(
          { success: false, error: "CV must be under 5MB." },
          { status: 400 }
        );
      }
      const arrayBuffer = await cv.arrayBuffer();
      attachments.push({
        filename: cv.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    const cvLine =
      cv && cv instanceof File && cv.size > 0
        ? `${cv.name} (${(cv.size / 1024).toFixed(0)} KB)`
        : "—";

    const fields: Array<[string, string]> = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone || "—"],
      ["City", city || "—"],
      ["Area of Interest", areaOfInterest],
      ["Introduction", introduction || "—"],
      ["CV", cvLine],
    ];

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #0A1628; max-width: 600px;">
        <h2 style="margin: 0 0 16px;">New career application</h2>
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
      subject: `New career application from ${name}`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error("Resend error (careers):", error);
      return Response.json(
        { success: false, error: "Failed to send. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Careers route error:", err);
    return Response.json(
      { success: false, error: "Failed to send. Please try again." },
      { status: 500 }
    );
  }
}
