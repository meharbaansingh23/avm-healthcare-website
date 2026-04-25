import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const escape = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const city = formData.get("city");
    const areaOfInterest = formData.get("areaOfInterest");
    const introduction = formData.get("introduction");
    const cv = formData.get("cv");

    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (cv && cv instanceof File && cv.size > 0) {
      const arrayBuffer = await cv.arrayBuffer();
      attachments.push({
        filename: cv.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    const rows: Array<[string, unknown]> = [
      ["Name", name],
      ["Email", email],
      ["Phone", phone],
      ["City", city],
      ["Area of Interest", areaOfInterest],
      ["Introduction", introduction],
      [
        "CV",
        cv && cv instanceof File && cv.size > 0
          ? `${cv.name} (${cv.size} bytes)`
          : "—",
      ],
    ];

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color:#0A1628; max-width:560px;">
        <h2 style="margin:0 0 16px; font-size:18px;">Career Expression of Interest</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:10px 12px; background:#F5F5F3; border:1px solid #E2E8F0; width:160px; vertical-align:top; font-weight:600;">${k}</td>
              <td style="padding:10px 12px; border:1px solid #E2E8F0; vertical-align:top; white-space:pre-wrap;">${escape(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "info@avmhealthcare.com",
      subject: `Career Expression of Interest — ${name ?? "Unknown"}`,
      html,
      replyTo: typeof email === "string" ? email : undefined,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      return Response.json({ ok: false, error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
