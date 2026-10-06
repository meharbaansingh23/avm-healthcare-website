import { Resend } from "resend";
import { renderFormSubmissionEmail } from "@/emails/FormSubmissionEmail";
import { sanityWriteClient } from "@/lib/sanity-write";
import { checkSpam } from "@/lib/spam-guard";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AVM Careers <careers@send.avmhealthcare.com>";
const toEmails = (process.env.RESEND_TO_CAREERS || "careers@avmhealthcare.com")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// CORS — the Shopify storefront posts this form cross-origin. Only these
// origins are echoed back; the wildcard (*) is never used.
const ALLOWED_ORIGINS = new Set([
  "https://1zkcvw-8f.myshopify.com",
  "https://avmhealthcare.com",
  "https://www.avmhealthcare.com",
]);
const SHOPIFY_PREVIEW_ORIGIN = /^https:\/\/([a-z0-9-]+\.)+shopifypreview\.com$/i;

function allowedOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  return ALLOWED_ORIGINS.has(origin) || SHOPIFY_PREVIEW_ORIGIN.test(origin)
    ? origin
    : null;
}

function withCors(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  headers.append("Vary", "Origin");
  const origin = allowedOrigin(request);
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function OPTIONS(request: Request) {
  return withCors(
    request,
    new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  );
}

export async function POST(request: Request) {
  return withCors(request, await handlePost(request));
}

async function handlePost(request: Request): Promise<Response> {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const areaOfInterest = String(formData.get("areaOfInterest") ?? "").trim();
    const introduction = String(formData.get("introduction") ?? "").trim();
    const cv = formData.get("cv");

    // Bot filter — pretend success so bots don't learn they were blocked.
    const spam = checkSpam(formData, { name, city });
    if (spam.isSpam) {
      console.warn(`Careers submission blocked (${spam.reason}):`, { name, email });
      return Response.json({ success: true });
    }

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
    let cvBuffer: Buffer | undefined;
    if (cv && cv instanceof File && cv.size > 0) {
      if (cv.size > MAX_FILE_SIZE) {
        return Response.json(
          { success: false, error: "CV must be under 5MB." },
          { status: 400 }
        );
      }
      const arrayBuffer = await cv.arrayBuffer();
      cvBuffer = Buffer.from(arrayBuffer);
      attachments.push({
        filename: cv.name,
        content: cvBuffer,
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

    try {
      let cvAsset: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
      if (cvBuffer && cv instanceof File) {
        const uploaded = await sanityWriteClient.assets.upload("file", cvBuffer, {
          filename: cv.name,
          contentType: cv.type || "application/octet-stream",
        });
        cvAsset = { _type: "file", asset: { _type: "reference", _ref: uploaded._id } };
      }

      await sanityWriteClient.create({
        _type: "careerSubmission",
        name,
        email,
        phone: phone || "",
        roleInterest: areaOfInterest,
        city: city || "",
        coverLetter: introduction || "",
        ...(cvAsset ? { cv: cvAsset } : {}),
        submittedAt: new Date().toISOString(),
        status: "new",
      });
    } catch (sanityError) {
      console.error("Sanity write failed (careers):", sanityError);
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
