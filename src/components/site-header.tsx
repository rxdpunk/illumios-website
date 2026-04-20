import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { APPLICATIONS_OPEN } from "@/lib/site-state";
import styles from "./site-shell.module.css";

const links = [
  { href: "#path", label: "What happens next" },
  { href: "#apply", label: "Join" },
  { href: "/privacy", label: "Privacy" },
  { href: "/tos", label: "Terms" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brandLink} aria-label="illumios home">
        <BrandMark className={styles.brandMark} />
        <span className={styles.brandMeta}>Lighting Your Path Through AI</span>
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        {links.map((link) => (
          link.href.startsWith("/") ? (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          )
        ))}
      </nav>

      <a href="#apply" className={styles.headerCta}>
        {APPLICATIONS_OPEN ? "Apply now" : "Join waitlist"}
      </a>
    </header>
  );
}
