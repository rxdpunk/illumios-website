"use client";

import Link from "next/link";
import { useState } from "react";
import { APPLICATIONS_OPEN, WAITLIST_OPEN } from "@/lib/site-state";
import styles from "./application-form.module.css";

type ApplyResponse = {
  mode?: "application" | "waitlist";
  redirectUrl?: string;
  error?: string;
  message?: string;
};

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      source: WAITLIST_OPEN ? "website-waitlist" : "website-academia",
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApplyResponse;

      if (!response.ok) {
        setError(
          data.error ||
            data.message ||
            "We could not save your details right now. Please try again.",
        );
        return;
      }

      if (data.redirectUrl) {
        window.location.assign(data.redirectUrl);
        return;
      }

      setSuccessMessage(
        data.message ||
          "You’re on the priority list. We’ll email you when the founding cohort opens.",
      );
    } catch {
      setError("We could not save your details right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div className={styles.successPanel} role="status" aria-live="polite">
        <p className={styles.successEyebrow}>You’re in</p>
        <h4 className={styles.successTitle}>Priority-list spot saved.</h4>
        <p className={styles.successMessage}>{successMessage}</p>
        <p className={styles.legal}>
          We’ll use your email for launch updates, opening details, and next
          steps. Review our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      action={handleSubmit}
      aria-describedby={error ? "application-error" : undefined}
    >
      <div className={styles.grid}>
        <label className={styles.field}>
          <span>First name</span>
          <input
            type="text"
            name="firstName"
            placeholder="What should we call you?"
            autoComplete="given-name"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Email address</span>
          <input
            type="email"
            name="email"
            placeholder="you@business.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? WAITLIST_OPEN
            ? "Joining…"
            : "Continuing…"
          : APPLICATIONS_OPEN
            ? "Continue to the fit quiz"
            : "Join the priority list"}
      </button>

      {WAITLIST_OPEN ? (
        <p className={styles.pausedNote}>
          Founding cohort updates only for now. No spam, and you can opt out
          anytime.
        </p>
      ) : null}

      {error ? (
        <p className={styles.error} id="application-error" role="alert">
          {error}
        </p>
      ) : null}

      <p className={styles.legal}>
        By submitting, you agree that illumios may contact you about the
        founding cohort and related next steps. Review our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
