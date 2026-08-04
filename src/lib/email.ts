import { Resend } from "resend";

// Lazily construct the Resend client. The constructor throws when
// RESEND_API_KEY is unset, so instantiating at module scope would crash any
// route that imports this file (e.g. /api/delete-account) before its own
// missing-key guard can run. Only build it when a key is actually present.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendVerificationEmail(
  to: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // If no API key is set, log and return success for development
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email] Verification code for ${to}: ${code}`);
      console.log(
        "[Email] RESEND_API_KEY not set - email not sent (development mode)"
      );
      return { success: true };
    }

    // Determine the "from" email address
    // Resend doesn't allow sending from Gmail/Yahoo/Hotmail/Outlook domains
    // Use Resend's default domain for testing, or your own verified domain
    let fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    // Check if trying to use a common email provider (which can't be verified)
    const commonProviders = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com"];
    const isCommonProvider = commonProviders.some(provider => fromEmail.includes(provider));
    
    if (isCommonProvider) {
      console.warn(`[Email] Cannot send from ${fromEmail} (unverified domain). Using Resend default domain.`);
      console.warn("[Email] To use a custom domain, verify it at https://resend.com/domains");
      fromEmail = "onboarding@resend.dev";
    }

    const { data, error } = await getResend().emails.send({
      from: fromEmail,
      to: [to],
      subject: "Your LarLar Books 2FA Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #67377e;">LarLar Books - 2FA Verification</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #67377e; color: white; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/** Resolve a safe "from" address, mirroring sendVerificationEmail. */
function resolveFromEmail(): string {
  let fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const commonProviders = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
  ];
  if (commonProviders.some((p) => fromEmail.includes(p))) {
    fromEmail = "onboarding@resend.dev";
  }
  return fromEmail;
}

/**
 * Notify the support inbox that an account-deletion request was submitted from
 * the public /delete-account page. Always sent, regardless of whether a
 * matching profile exists, so staff can action requests that don't map to a
 * current account. Intentionally does NOT email the requester (the form is
 * unauthenticated; we must not send mail to arbitrary typed addresses).
 */
export async function sendDeletionRequestNotification(params: {
  requesterEmail: string;
  reason?: string;
  profileMatched: boolean;
  rowInserted: boolean;
  deadline?: string;
}): Promise<{ success: boolean; error?: string }> {
  const { requesterEmail, reason, profileMatched, rowInserted, deadline } =
    params;
  const support = "support@larlarbooks.com";

  try {
    if (!process.env.RESEND_API_KEY) {
      console.log(
        `[Email] Deletion request from ${requesterEmail} (matched=${profileMatched}, inserted=${rowInserted})`
      );
      console.log("[Email] RESEND_API_KEY not set - email not sent (dev mode)");
      return { success: true };
    }

    const { error } = await getResend().emails.send({
      from: resolveFromEmail(),
      to: [support],
      replyTo: requesterEmail,
      subject: `Account deletion request — ${requesterEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #67377e;">Account deletion request</h2>
          <table style="border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding:4px 12px 4px 0; color:#666;">Email</td><td>${requesterEmail}</td></tr>
            <tr><td style="padding:4px 12px 4px 0; color:#666;">Matched a profile</td><td>${profileMatched ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:4px 12px 4px 0; color:#666;">Pending row created</td><td>${rowInserted ? "Yes" : "No (none created)"}</td></tr>
            ${deadline ? `<tr><td style="padding:4px 12px 4px 0; color:#666;">Deadline</td><td>${deadline}</td></tr>` : ""}
            <tr><td style="padding:4px 12px 4px 0; color:#666; vertical-align:top;">Reason</td><td>${reason ? escapeHtml(reason) : "(none provided)"}</td></tr>
          </table>
          <p style="color:#666; font-size:13px; margin-top:16px;">
            Submitted from the public /delete-account page. Review before
            processing; the account was not deactivated automatically.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error (deletion notification):", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error("Email send error (deletion notification):", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
