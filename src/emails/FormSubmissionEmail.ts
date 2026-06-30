// Shared branded HTML email template for all form-submission notification emails.
// Plain string template (not React Email) — Outlook and other clients require
// fully inline styles and <table>-based layout, so a hand-rolled string keeps
// full control over markup without adding a render-pipeline dependency.

export type EmailField = {
  label: string;
  value: string;
};

export type FormSubmissionEmailProps = {
  title: string;
  submitterName: string;
  submitterEmail: string;
  fields: EmailField[];
  ctaText?: string;
};

export const escapeHtml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isEmailValue = (label: string, value: string) =>
  label.toLowerCase() === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export function renderFormSubmissionEmail({
  title,
  submitterName,
  submitterEmail,
  fields,
  ctaText,
}: FormSubmissionEmailProps): string {
  const resolvedCtaText =
    ctaText ?? `Reply to this email to respond directly to ${submitterName}.`;

  const fieldRows = fields
    .map((field, index) => {
      const isLast = index === fields.length - 1;
      const borderStyle = isLast ? "" : "border-bottom:1px solid #E2E8F0;";
      const safeValue = escapeHtml(field.value).replace(/\n/g, "<br>");
      const valueContent = isEmailValue(field.label, field.value)
        ? `<a href="mailto:${escapeHtml(field.value)}" style="color:#2563EB; text-decoration:none;">${safeValue}</a>`
        : safeValue;

      return `
        <tr>
          <td class="avm-label" style="padding:16px 16px 16px 0; ${borderStyle} width:35%; vertical-align:top; text-transform:uppercase; font-size:11px; letter-spacing:1.5px; color:#94A3B8; font-weight:500; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
            ${escapeHtml(field.label)}
          </td>
          <td class="avm-value" style="padding:16px 0; ${borderStyle} vertical-align:top; color:#0A1628; font-size:15px; line-height:1.6; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;">
            ${valueContent}
          </td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
      @media (max-width: 600px) {
        .avm-body { padding: 24px !important; }
        .avm-label, .avm-value {
          display: block !important;
          width: 100% !important;
          padding: 4px 0 !important;
          border-bottom: none !important;
        }
        .avm-row-spacer { display: block !important; height: 16px !important; border-bottom: 1px solid #E2E8F0 !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#FAFAF9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF9; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#FFFFFF; border-radius:8px; overflow:hidden;">
            <!-- HEADER -->
            <tr>
              <td align="center" style="background-color:#0A1628; padding:32px 0;">
                <!-- TODO: Update logo URL to avmhealthcare.com once custom domain is live -->
                <img
                  src="https://avm-healthcare-website.vercel.app/images/logo-light.png"
                  alt="AVM Healthcare"
                  height="40"
                  style="height:40px; width:auto; display:block;"
                />
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td class="avm-body" style="background-color:#FFFFFF; padding:40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-bottom:32px;">
                      <div style="font-family:Georgia, 'Times New Roman', serif; font-style:italic; font-size:28px; color:#0A1628; text-align:center;">
                        ${escapeHtml(title)}
                      </div>
                      <div style="margin-top:12px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:11px; text-transform:uppercase; letter-spacing:2px; color:#94A3B8; text-align:center;">
                        Submitted via avmhealthcare.com
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        ${fieldRows}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:32px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAFAF9; border:1px solid #E2E8F0; border-radius:8px;">
                        <tr>
                          <td align="center" style="padding:24px; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:14px; color:#475569; text-align:center;">
                            <a href="mailto:${escapeHtml(submitterEmail)}" style="color:#475569; text-decoration:none;">${escapeHtml(resolvedCtaText)}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- FOOTER -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; margin-top:32px;">
            <tr>
              <td align="center" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size:12px; color:#94A3B8; text-align:center; line-height:1.8;">
                AVM Healthcare Products Pvt. Ltd. &middot; New Delhi, India<br />
                &copy; 2026 AVM Healthcare. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
