import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendDeletionRequestNotification } from "@/lib/email";

// Uses the Supabase service-role key — must run on the Node runtime, never edge/client.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GRACE_DAYS = 30; // matches DELETION_GRACE_DAYS in the mobile app
const RETENTION_BASIS =
  "Financial records (transactions, invoices, author earnings) retained for statutory accounting and tax obligations.";

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  reason: z.string().trim().max(2000).optional(),
});

// Generic response — identical whether or not the email maps to an account,
// so the endpoint can't be used to enumerate registered emails.
//
// Built per request, not once at module scope: a NextResponse body is a stream
// that can only be consumed once, so a shared instance serves the first request
// after a cold start and returns a broken body to every request after it on the
// same warm instance.
const genericOk = () =>
  NextResponse.json({
    success: true,
    message:
      "Your deletion request has been received. Our team will process it and follow up by email.",
  });

export async function POST(request: Request) {
  let parsed: z.infer<typeof bodySchema>;
  try {
    parsed = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { success: false, error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const { email, reason } = parsed;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    // Misconfiguration: don't silently drop the request. Still notify support
    // so the submission isn't lost, then return the generic OK to the user.
    console.error(
      "[delete-account] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
    await sendDeletionRequestNotification({
      requesterEmail: email,
      reason,
      profileMatched: false,
      rowInserted: false,
    });
    return genericOk();
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  let profileMatched = false;
  let rowInserted = false;
  let deadlineStr: string | undefined;

  try {
    const { data: profile, error: lookupError } = await supabase
      .from("Profiles")
      .select("profile_id")
      .eq("profile_email", email)
      .maybeSingle();

    if (lookupError) throw lookupError;

    if (profile?.profile_id) {
      profileMatched = true;

      // Don't create a duplicate if a request is already open for this user.
      const { data: existing, error: existingError } = await supabase
        .from("Data_Deletion_Requests")
        .select("deletion_request_id")
        .eq("user_id", profile.profile_id)
        .eq("deletion_request_status", "pending")
        .maybeSingle();

      if (existingError) throw existingError;

      if (!existing) {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + GRACE_DAYS);
        deadlineStr = deadline.toISOString().slice(0, 10);

        const { error: insertError } = await supabase
          .from("Data_Deletion_Requests")
          .insert({
            user_id: profile.profile_id,
            deletion_request_reason:
              reason && reason.length > 0
                ? reason
                : "User requested account deletion via website",
            deletion_request_status: "pending",
            deletion_request_deadline: deadlineStr,
            deletion_request_legal_basis_for_retention: RETENTION_BASIS,
          });

        if (insertError) throw insertError;
        rowInserted = true;
      }
    }
  } catch (err) {
    // Log but do not leak details to the client. Support is still notified below.
    console.error("[delete-account] Supabase error:", err);
  }

  // Always notify support so no request is lost, regardless of match/insert.
  await sendDeletionRequestNotification({
    requesterEmail: email,
    reason,
    profileMatched,
    rowInserted,
    deadline: deadlineStr,
  });

  return genericOk();
}
