import { NextResponse } from "next/server";

import {
  buildQuizRedirectUrl,
  getApplicationCaptureConfig,
  normalizeApplicationInput,
  parseApplyRequestBody,
  persistApplicationToSupabase,
  resolvePageUrl,
  syncLeadToGhl,
  validateApplicationInput,
} from "@/lib/apply";
import type {
  ApplyApiErrorResponse,
  ApplyApiSuccessResponse,
} from "@/types/application";
import { APPLICATIONS_OPEN, WAITLIST_OPEN } from "@/lib/site-state";

export async function POST(request: Request) {
  if (!APPLICATIONS_OPEN && !WAITLIST_OPEN) {
    const response: ApplyApiErrorResponse = {
      ok: false,
      message: "Lead capture is temporarily unavailable right now.",
    };

    return NextResponse.json(response, { status: 503 });
  }

  let rawBody: Record<string, unknown>;

  try {
    rawBody = await parseApplyRequestBody(request);
  } catch (error) {
    const response: ApplyApiErrorResponse = {
      ok: false,
      message: error instanceof Error ? error.message : "Invalid request body.",
    };

    return NextResponse.json(response, { status: 400 });
  }

  const application = normalizeApplicationInput(rawBody);
  const captureMode = APPLICATIONS_OPEN ? "application" : "waitlist";

  if (!application.source) {
    application.source =
      captureMode === "waitlist" ? "website-waitlist" : "website-academia";
  }

  const errors = validateApplicationInput(application);

  if (Object.keys(errors).length > 0) {
    const response: ApplyApiErrorResponse = {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      errors,
    };

    return NextResponse.json(response, { status: 400 });
  }

  const config = getApplicationCaptureConfig();
  const pageUrl = resolvePageUrl(request, application);
  const redirectUrl =
    captureMode === "application"
      ? buildQuizRedirectUrl(application, config.quizUrl)
      : undefined;
  const storage = await persistApplicationToSupabase(application, config, {
    captureMode,
    pageUrl,
    quizRedirectUrl: redirectUrl,
    referrerUrl: request.headers.get("referer") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
  });
  const ghl = await syncLeadToGhl(application, config, captureMode);

  const response: ApplyApiSuccessResponse = {
    ok: true,
    mode: captureMode,
    redirectUrl,
    message:
      captureMode === "waitlist"
        ? "You’re on the priority list. We’ll email you when the founding cohort opens."
        : "Application received. Sending you to the fit quiz now.",
    lead: {
      firstName: application.firstName,
      email: application.email,
      phone: application.phone || undefined,
      source: application.source,
    },
    storage,
    ghl,
  };

  return NextResponse.json(response, { status: 200 });
}
