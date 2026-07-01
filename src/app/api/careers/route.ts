import { Resend } from "resend";
import { renderFormSubmissionEmail } from "@/emails/FormSubmissionEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AVM Careers <careers@send.avmhealthcare.com>";
const toEmails = (process.env.RESEND_TO_CAREERS || "careers@avmhealthcare.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

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

    const fields = [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "—" },
      { label: "City", value: city || "—" },
      { label: "Area of Interest", value: areaOfInterest },
      { label: "Introduction", value: introduction || "—" },
      { label: "CV", value: cvLine },
    ];

    const html = renderFormSubmissionEmail({
      title: "New careers application",
      submitterName: name,
      submitterEmail: email,
      fields,
    });

    const { error } = await resend.emails.send({
      from: FROM,
      to: toEmails,
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
