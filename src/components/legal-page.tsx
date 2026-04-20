import { Nunito } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

const palette = {
  navy: "#0D1B4B",
  orange: "#F26522",
  cream: "#FAF7F2",
  white: "#FFFFFF",
  text: "#2B3553",
  muted: "#667085",
  line: "rgba(13, 27, 75, 0.12)",
};

function renderInlineLinks(text: string) {
  const parts = text.split(/(info@illumios\.com|\(856\) 329-3539)/g);

  return parts.map((part, index) => {
    if (part === "info@illumios.com") {
      return (
        <a key={`${part}-${index}`} href="mailto:info@illumios.com" style={styles.inlineLink}>
          {part}
        </a>
      );
    }

    if (part === "(856) 329-3539") {
      return (
        <a key={`${part}-${index}`} href="tel:+18563293539" style={styles.inlineLink}>
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className={nunito.className} style={styles.page}>
      <SiteHeader />

      <main style={styles.main}>
        <section style={styles.heroCard}>
          <p style={styles.eyebrow}>illumios</p>
          <h1 style={styles.title}>{title}</h1>
          <p style={styles.subtitle}>Live AI Training for Business Owners</p>
          <p style={styles.updated}>Last updated: {lastUpdated}</p>
          <div style={styles.introStack}>
            {intro.map((paragraph) => (
              <p key={paragraph} style={styles.bodyText}>
                {renderInlineLinks(paragraph)}
              </p>
            ))}
          </div>
        </section>

        <section style={styles.contentCard}>
          {sections.map((section) => (
            <section key={section.heading} style={styles.section}>
              <h2 style={styles.sectionTitle}>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} style={styles.bodyText}>
                  {renderInlineLinks(paragraph)}
                </p>
              ))}
              {section.bullets ? (
                <ul style={styles.list}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet} style={styles.listItem}>
                      {renderInlineLinks(bullet)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(13,27,75,0.04) 0%, rgba(250,247,242,0.75) 22%, #FFFFFF 100%)",
    color: palette.text,
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "28px 24px 72px",
  },
  heroCard: {
    background: palette.white,
    border: `1px solid ${palette.line}`,
    borderRadius: "28px",
    padding: "32px clamp(22px, 5vw, 42px)",
    boxShadow: "0 24px 60px rgba(13, 27, 75, 0.08)",
  },
  eyebrow: {
    display: "inline-flex",
    marginBottom: "14px",
    padding: "8px 12px",
    borderRadius: "999px",
    background: palette.cream,
    color: palette.orange,
    fontSize: "0.78rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 900,
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3.3rem)",
    lineHeight: 1.02,
    color: palette.navy,
    fontWeight: 900,
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "1.02rem",
    color: palette.navy,
    fontWeight: 800,
  },
  updated: {
    marginTop: "12px",
    color: palette.muted,
    fontSize: "0.95rem",
    fontWeight: 700,
  },
  introStack: {
    marginTop: "22px",
    display: "grid",
    gap: "14px",
  },
  contentCard: {
    marginTop: "24px",
    padding: "8px 0",
  },
  section: {
    background: palette.white,
    border: `1px solid ${palette.line}`,
    borderRadius: "24px",
    padding: "26px clamp(20px, 4vw, 34px)",
    boxShadow: "0 16px 44px rgba(13, 27, 75, 0.05)",
  },
  sectionTitle: {
    marginBottom: "14px",
    color: palette.navy,
    fontSize: "1.16rem",
    fontWeight: 900,
  },
  bodyText: {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: palette.text,
  },
  list: {
    marginTop: "12px",
    paddingLeft: "20px",
    display: "grid",
    gap: "8px",
  },
  listItem: {
    fontSize: "1rem",
    lineHeight: 1.7,
    color: palette.text,
  },
  inlineLink: {
    color: palette.orange,
    fontWeight: 800,
  },
};
