import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import type {
  AcademiaApplicationInput,
  ApplicationCaptureConfig,
  ApplicationCaptureMode,
  GhlSyncResult,
  ApplicationValidationErrors,
  NormalizedAcademiaApplication,
  StoragePersistenceResult,
} from "@/types/application";

const DEFAULT_QUIZ_URL = "https://quiz.illumios.com";
const DEFAULT_OFFER_SLUG = "illumios-academia";
const DEFAULT_SUPABASE_TABLE = "website_applications";
const DEFAULT_GHL_API_BASE_URL = "https://services.leadconnectorhq.com";
const DEFAULT_SOURCE = "website-academia";
const WEBSITE_SOURCE = "illumios-website";
const WAITLIST_GHL_TAGS =
  "academia-interest,illumios-academia,founding-cohort,website-waitlist";
const APPLICATION_GHL_TAGS =
  "academia-interest,illumios-academia,website-application";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+().\-\s]{7,25}$/;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeUrl(value: string, fallback: string): string {
  try {
    return new URL(value).toString();
  } catch {
    return fallback;
  }
}

export function getApplicationCaptureConfig(): ApplicationCaptureConfig {
  return {
    quizUrl: normalizeUrl(
      process.env.ILLUMIOS_QUIZ_URL?.trim() || DEFAULT_QUIZ_URL,
      DEFAULT_QUIZ_URL,
    ),
    supabaseUrl: process.env.SUPABASE_URL?.trim() || "",
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY?.trim() || "",
    supabaseApplicationsTable:
      process.env.SUPABASE_APPLICATIONS_TABLE?.trim() ||
      DEFAULT_SUPABASE_TABLE,
    ghlApiBaseUrl: normalizeUrl(
      process.env.ILLUMIOS_GHL_API_BASE_URL?.trim() || DEFAULT_GHL_API_BASE_URL,
      DEFAULT_GHL_API_BASE_URL,
    ).replace(/\/+$/, ""),
    ghlApiToken: process.env.ILLUMIOS_GHL_API_TOKEN?.trim() || "",
    ghlLocationId: process.env.ILLUMIOS_GHL_LOCATION_ID?.trim() || "",
    offerSlug: process.env.ILLUMIOS_GHL_OFFER_SLUG?.trim() || DEFAULT_OFFER_SLUG,
  };
}

export async function parseApplyRequestBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await request.json()) as unknown;

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("Request body must be a JSON object.");
    }

    return payload as Record<string, unknown>;
  }

  if (
    !contentType ||
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  throw new Error("Unsupported content type.");
}

export function normalizeApplicationInput(input: AcademiaApplicationInput): NormalizedAcademiaApplication {
  return {
    firstName: collapseWhitespace(readString(input.firstName ?? input.first_name)),
    email: readString(input.email).toLowerCase(),
    phone: collapseWhitespace(readString(input.phone)),
    pageUrl: readString(input.pageUrl ?? input.page_url),
    source: readString(input.source),
  };
}

export function validateApplicationInput(
  input: NormalizedAcademiaApplication,
): ApplicationValidationErrors {
  const errors: ApplicationValidationErrors = {};

  if (!input.firstName) {
    errors.firstName = "First name is required.";
  } else if (input.firstName.length > 80) {
    errors.firstName = "First name must be 80 characters or fewer.";
  }

  if (!input.email) {
    errors.email = "Email is required.";
  } else if (input.email.length > 320 || !EMAIL_PATTERN.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (input.phone && !PHONE_PATTERN.test(input.phone)) {
    errors.phone = "Enter a valid phone number or leave it blank.";
  }

  return errors;
}

export function buildQuizRedirectUrl(
  input: NormalizedAcademiaApplication,
  quizUrl: string,
): string {
  const url = new URL(quizUrl);
  url.searchParams.set("first_name", input.firstName);
  url.searchParams.set("email", input.email);
  url.searchParams.set("source", input.source || DEFAULT_SOURCE);

  if (input.phone) {
    url.searchParams.set("phone", input.phone);
  }

  return url.toString();
}

export async function persistApplicationToSupabase(
  input: NormalizedAcademiaApplication,
  config: ApplicationCaptureConfig,
  options: {
    captureMode: ApplicationCaptureMode;
    pageUrl: string;
    quizRedirectUrl?: string;
    referrerUrl: string;
    userAgent: string;
  },
): Promise<StoragePersistenceResult> {
  if (!config.supabaseUrl || !config.supabaseSecretKey) {
    return {
      attempted: false,
      persisted: false,
      skippedReason: "supabase_not_configured",
    };
  }

  const supabase = getSupabaseAdminClient(
    config.supabaseUrl,
    config.supabaseSecretKey,
  );

  if (!supabase) {
    return {
      attempted: false,
      persisted: false,
      skippedReason: "supabase_not_configured",
    };
  }

  const insertPayload = {
    offer_slug: config.offerSlug,
    status: options.captureMode === "waitlist" ? "waitlist" : "submitted",
    first_name: input.firstName,
    email: input.email,
    phone: input.phone || null,
    source: input.source || DEFAULT_SOURCE,
    page_url: options.pageUrl || null,
    quiz_redirect_url: options.quizRedirectUrl || null,
    referrer_url: options.referrerUrl || null,
    user_agent: options.userAgent || null,
    metadata: {
      captureMode: options.captureMode,
      websiteSource: WEBSITE_SOURCE,
      persistedAt: new Date().toISOString(),
    },
    raw_payload: {
      firstName: input.firstName,
      email: input.email,
      phone: input.phone || null,
      source: input.source || DEFAULT_SOURCE,
      pageUrl: input.pageUrl || null,
    },
  };

  try {
    const { data, error } = await supabase
      .from(config.supabaseApplicationsTable)
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      return {
        attempted: true,
        persisted: false,
        error: error.message,
      };
    }

    return {
      attempted: true,
      persisted: true,
      recordId:
        data && typeof data === "object" && "id" in data
          ? String(data.id)
          : undefined,
    };
  } catch (error) {
    return {
      attempted: true,
      persisted: false,
      error: error instanceof Error ? error.message : "Unknown Supabase error.",
    };
  }
}

function buildGhlTags(captureMode: ApplicationCaptureMode): string[] {
  return (
    captureMode === "waitlist" ? WAITLIST_GHL_TAGS : APPLICATION_GHL_TAGS
  )
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function buildGhlContactPayload(
  input: NormalizedAcademiaApplication,
  config: ApplicationCaptureConfig,
): Record<string, unknown> {
  return {
    locationId: config.ghlLocationId,
    firstName: input.firstName,
    email: input.email,
    phone: input.phone || undefined,
    source: input.source || WEBSITE_SOURCE,
  };
}

function getGhlHeaders(config: ApplicationCaptureConfig): Record<string, string> {
  return {
    Authorization: `Bearer ${config.ghlApiToken}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function extractContactId(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined;
  }

  if ("contactId" in payload && typeof payload.contactId === "string") {
    return payload.contactId;
  }

  if ("id" in payload && typeof payload.id === "string") {
    return payload.id;
  }

  for (const value of Object.values(payload)) {
    if (value && typeof value === "object") {
      const nestedId = extractContactId(value);
      if (nestedId) {
        return nestedId;
      }
    }
  }

  return undefined;
}

async function addTagsToGhlContact(
  contactId: string,
  tags: string[],
  config: ApplicationCaptureConfig,
): Promise<void> {
  if (!tags.length) {
    return;
  }

  const response = await fetch(
    `${config.ghlApiBaseUrl}/contacts/${contactId}/tags`,
    {
      method: "POST",
      headers: getGhlHeaders(config),
      body: JSON.stringify({ tags }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    },
  );

  if (!response.ok) {
    throw new Error(`Tag update responded with status ${response.status}.`);
  }
}

export async function syncLeadToGhl(
  input: NormalizedAcademiaApplication,
  config: ApplicationCaptureConfig,
  captureMode: ApplicationCaptureMode,
): Promise<GhlSyncResult> {
  if (!config.ghlApiToken || !config.ghlLocationId) {
    return {
      attempted: false,
      synced: false,
      skippedReason: "ghl_api_not_configured",
    };
  }

  const payload = buildGhlContactPayload(input, config);
  const tags = buildGhlTags(captureMode);

  try {
    const response = await fetch(`${config.ghlApiBaseUrl}/contacts/upsert`, {
      method: "POST",
      headers: getGhlHeaders(config),
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return {
        attempted: true,
        synced: false,
        error: `Contact upsert responded with status ${response.status}.`,
      };
    }

    const result = (await response.json().catch(() => null)) as unknown;
    const contactId = extractContactId(result);

    if (contactId) {
      await addTagsToGhlContact(contactId, tags, config);
    }

    return {
      attempted: true,
      synced: true,
      contactId,
      tagsApplied: contactId ? tags : undefined,
    };
  } catch (error) {
    return {
      attempted: true,
      synced: false,
      error: error instanceof Error ? error.message : "Unknown GHL sync error.",
    };
  }
}

export function resolvePageUrl(request: Request, input: NormalizedAcademiaApplication): string {
  if (input.pageUrl) {
    return input.pageUrl;
  }

  return request.headers.get("referer") ?? "";
}
