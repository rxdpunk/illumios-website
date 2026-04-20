export type EnrollmentMode = "open" | "waitlist";

function getEnrollmentMode(): EnrollmentMode {
  return "waitlist";
}

export const ENROLLMENT_MODE = getEnrollmentMode();

export const APPLICATIONS_OPEN = ENROLLMENT_MODE === "open";
export const WAITLIST_OPEN = ENROLLMENT_MODE === "waitlist";
