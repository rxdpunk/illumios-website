export type ApplicationField = "firstName" | "email" | "phone";

export type ApplicationValidationErrors = Partial<Record<ApplicationField, string>>;

export type ApplicationCaptureMode = "application" | "waitlist";

export type AcademiaApplicationInput = {
  firstName?: string;
  first_name?: string;
  email?: string;
  phone?: string;
  pageUrl?: string;
  page_url?: string;
  source?: string;
};

export type NormalizedAcademiaApplication = {
  firstName: string;
  email: string;
  phone: string;
  pageUrl: string;
  source: string;
};

export type ApplicationCaptureConfig = {
  quizUrl: string;
  supabaseUrl: string;
  supabaseSecretKey: string;
  supabaseApplicationsTable: string;
  ghlApiBaseUrl: string;
  ghlApiToken: string;
  ghlLocationId: string;
  offerSlug: string;
};

export type StoragePersistenceResult = {
  attempted: boolean;
  persisted: boolean;
  error?: string;
  skippedReason?: string;
  recordId?: string;
};

export type GhlSyncResult = {
  attempted: boolean;
  synced: boolean;
  contactId?: string;
  tagsApplied?: string[];
  error?: string;
  skippedReason?: string;
};

export type ApplyApiSuccessResponse = {
  ok: true;
  mode: ApplicationCaptureMode;
  redirectUrl?: string;
  message?: string;
  lead: {
    firstName: string;
    email: string;
    phone?: string;
    source: string;
  };
  storage: StoragePersistenceResult;
  ghl: GhlSyncResult;
};

export type ApplyApiErrorResponse = {
  ok: false;
  message: string;
  errors?: ApplicationValidationErrors;
};
