import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { APPLICATIONS_OPEN } from "@/lib/site-state";
import styles from "./site-shell.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <BrandMark className={styles.footerMark} monochrome />
          <p>Education-first AI support for real work.</p>
        </div>

        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/tos">Terms of Service</Link>
          <a href="#apply">{APPLICATIONS_OPEN ? "Apply now" : "Join waitlist"}</a>
        </div>

        <div className={styles.footerMetaGroup}>
          <p className={styles.footerMeta}>© 2026 illumios LLC.</p>
          <p className={styles.footerMeta}>
            {APPLICATIONS_OPEN
              ? "Live AI training for small business owners."
              : "Founding cohort opening soon for small business owners."}
          </p>
        </div>
      </div>
    </footer>
  );
}
