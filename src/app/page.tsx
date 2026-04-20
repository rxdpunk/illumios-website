import type { Metadata } from "next";
import { ApplicationForm } from "@/components/application-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APPLICATIONS_OPEN, WAITLIST_OPEN } from "@/lib/site-state";
import styles from "./page.module.css";

const outcomes = [
  "One workflow mapped to your real business",
  "Reusable prompts, notes, and working examples",
  "A practical 30-day rollout plan",
];

const heroFacts = [
  "4 live weekly classes",
  "90 minutes each",
  "Instructor-led on Zoom",
  "Small-group program",
];

const heroHighlights = [
  "Live cohort, not a video library",
  "Built around one useful workflow",
  "Priority list gets the first opening invite",
];

const fitFor = [
  "Business owners buried in follow-up, admin, and repeatable work",
  "Consultants and independent professionals who want guided implementation",
  "Small teams that know AI could help but do not know where to start",
];

const notFor = [
  "People looking for a self-paced course library",
  "Enterprise procurement or large-team training programs",
  "Anyone wanting a done-for-you agency instead of guided learning",
];

const workflowExamples = [
  {
    label: "Client follow-up",
    title: "Turn notes and conversations into clearer next steps.",
    description:
      "Build a repeatable way to draft replies, organize action items, and keep follow-up from slipping.",
  },
  {
    label: "Admin load",
    title: "Lighten repetitive writing, prep, and handoff work.",
    description:
      "Use AI where it actually saves time instead of adding another tool you have to manage.",
  },
  {
    label: "Content flow",
    title: "Repurpose ideas and communication without starting from zero.",
    description:
      "Create a practical workflow for outreach, content, or internal communication that fits your real pace of work.",
  },
];

const includedItems = [
  "4 live weekly Zoom classes led by an instructor",
  "Worksheets and guided notes for each class",
  "Prompt templates and practical examples",
  "30 days of replay access",
  "Light between-session support and one optional office hour",
];

const curriculum = [
  {
    session: "Session 1",
    title: "Find your best AI opportunities",
    description:
      "Pinpoint where time, follow-up, and repeatable work are draining energy so you know what is worth testing first.",
  },
  {
    session: "Session 2",
    title: "Use the right tools and prompts",
    description:
      "Learn a simple prompt stack and practical tools that support the work you already do.",
  },
  {
    session: "Session 3",
    title: "Build one workflow that matters",
    description:
      "Turn one strong use case into a workflow you can use right away instead of a nice idea you never revisit.",
  },
  {
    session: "Session 4",
    title: "Lock in your next 30 days",
    description:
      "Leave with a clear rollout rhythm, concrete next actions, and a plan you can actually maintain.",
  },
];

const processSteps = [
  {
    label: "Priority list",
    title: "Join with your name and email",
    description:
      "We are opening with a founding cohort, so the first move is simply raising your hand and getting on the list.",
  },
  {
    label: "Launch updates",
    title: "Get the important details first",
    description:
      "We will share launch timing, cohort details, and what to expect before enrollment opens.",
  },
  {
    label: "First access",
    title: "Receive the founding cohort invite",
    description:
      "When enrollment opens, the priority list hears first so interested owners can review the offer before spots fill.",
  },
  {
    label: "Enrollment",
    title: "Complete the fit quiz and enrollment steps",
    description:
      "Once the cohort is live, we will move qualified people into the fit quiz, payment, account setup, and booking.",
  },
];

const trustPoints = [
  {
    title: "Led by operators",
    detail:
      "The people leading the live sessions are the same people shaping the program and working close to implementation.",
  },
  {
    title: "Built for follow-through",
    detail:
      "The goal is not to impress you with AI possibilities. It is to help you keep using what you build after the class ends.",
  },
  {
    title: "Designed for real work",
    detail:
      "This is a guided live program for owners carrying active work, not a course built around endless watching.",
  },
];

const faqItems = [
  {
    question: "Do I need to be technical?",
    answer:
      "No. illumios is built for business owners, entrepreneurs, and independent professionals who want practical guidance, not technical training.",
  },
  {
    question: "Are the classes live?",
    answer:
      "Yes. The core experience is a live weekly class with an instructor and a small group. Replays are included as backup, not as the main format.",
  },
  {
    question: "What happens after I join the waitlist?",
    answer:
      "You will get launch updates, founding cohort details, and the first email when enrollment opens. At that point, qualified people move into the fit quiz and enrollment flow.",
  },
];

export const metadata: Metadata = {
  title: "illumios | Founding Cohort for Business Owners",
  description:
    "Join the priority list for the first Illumios Academia founding cohort and be first to hear when enrollment opens for live weekly AI training built for small business owners.",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <div className={styles.heroMeta}>
                <p className={styles.eyebrow}>illumios</p>
                <p className={styles.subtitle}>
                  {WAITLIST_OPEN
                    ? "Founding cohort opening soon for business owners"
                    : "Live AI training for business owners"}
                </p>
              </div>
              <h1 className={styles.headline}>
                Build your first useful AI workflow in 30 days.
              </h1>
              <p className={styles.supportingLine}>
                Join the priority list for founder-led live training built for
                owners who want practical help applying AI to follow-up, admin,
                and repeatable work, not another stack of generic AI content.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#apply">
                  {APPLICATIONS_OPEN
                    ? "Start the application"
                    : "Join the priority list"}
                </a>
                <a className={styles.secondaryAction} href="#fit">
                  See If It Fits
                </a>
              </div>
              {WAITLIST_OPEN ? (
                <p className={styles.heroStatus}>
                  Founding cohort enrollment opens soon. Join the list for
                  launch updates, first access, and the opening invite.
                </p>
              ) : null}
            </div>

            <aside className={styles.heroPanel}>
              <p className={styles.panelLabel}>You leave with</p>
              <ul className={styles.outcomeList}>
                {outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
              <p className={styles.panelNote}>
                Small-group, founder-led, and opening with a limited founding
                cohort.
              </p>
              <div className={styles.panelFacts}>
                {heroFacts.map((fact) => (
                  <span key={fact} className={styles.panelFact}>
                    {fact}
                  </span>
                ))}
              </div>
            </aside>
          </div>
          <div className={styles.heroHighlights} aria-label="Program highlights">
            {heroHighlights.map((highlight) => (
              <p key={highlight} className={styles.heroHighlight}>
                {highlight}
              </p>
            ))}
          </div>
        </section>

        <section className={styles.section} id="fit">
          <div className={styles.fitLayout}>
            <div className={styles.fitIntro}>
              <p className={styles.sectionLabel}>Who it is for</p>
              <h2>Best for owners who want guided implementation, not AI theater.</h2>
              <p>
                illumios is for people who know AI should be useful by now and
                want a structured way to make that true inside real day-to-day
                work.
              </p>
            </div>

            <div className={styles.fitGrid}>
              <div className={styles.fitColumn}>
                <p className={styles.offerBlockLabel}>Best fit</p>
                <ul className={styles.fitList}>
                  {fitFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.fitColumn}>
                <p className={styles.offerBlockLabel}>Not built for</p>
                <ul className={styles.fitList}>
                  {notFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Where people usually start</p>
            <h2>The first wins usually show up in the same few places.</h2>
          </div>

          <div className={styles.workflowList}>
            {workflowExamples.map((example) => (
              <article key={example.label} className={styles.workflowItem}>
                <p className={styles.workflowLabel}>{example.label}</p>
                <div className={styles.workflowBody}>
                  <h3>{example.title}</h3>
                  <p>{example.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>Program structure</p>
            <h2>A guided 4-week live program built around one useful result.</h2>
            <p>
              Each week moves from identifying the best opportunity to building
              a workflow you can keep using after the program ends.
            </p>
          </div>

          <div className={styles.curriculumGrid}>
            {curriculum.map((item) => (
              <article key={item.session} className={styles.curriculumCard}>
                <p className={styles.curriculumSession}>{item.session}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.includesSection}>
            <div className={styles.includesIntro}>
              <p className={styles.offerBlockLabel}>Included</p>
              <h3>What comes with the program.</h3>
              <p>
                Enough live structure, support, and replay access to help you
                get traction without turning this into a giant course library.
              </p>
            </div>
            <ul className={styles.includesList}>
              {includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`} id="path">
          <div className={styles.sectionHeader}>
            <p className={styles.sectionLabel}>What happens next</p>
            <h2>A simple pre-launch path from waitlist to enrollment.</h2>
            <p>
              The public site is here to build interest early and gather the
              right people. When the founding cohort opens, the next steps stay
              simple and direct.
            </p>
          </div>

          <div className={styles.processList}>
            {processSteps.map((step, index) => (
              <article key={step.label} className={styles.processItem}>
                <div className={styles.processIndex}>0{index + 1}</div>
                <div>
                  <p className={styles.processLabel}>{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.credibilityShell}>
            <div className={styles.credibilityIntro}>
              <p className={styles.sectionLabel}>Who is leading it</p>
              <h2>Led live by operators, not course marketers.</h2>
              <p>
                The emphasis is practical adoption: what to use, what to ignore,
                and how to keep one workflow alive after the program ends.
              </p>
            </div>

            <div className={styles.credibilityContent}>
              <div className={styles.founderStack}>
                <article className={styles.founderProfile}>
                  <p className={styles.founderInitials}>SS</p>
                  <div className={styles.founderBody}>
                    <h3>Steve Sposato</h3>
                    <p className={styles.founderRole}>
                      Co-Founder and Operator | AI adoption and client
                      enablement
                    </p>
                    <p>
                      Steve leads client relationships, live delivery, and the
                      operating rhythm behind the program, keeping the material
                      tied to follow-through and practical use.
                    </p>
                  </div>
                </article>

                <aside className={styles.supportCard}>
                  <p className={styles.offerBlockLabel}>Behind the program</p>
                  <h3>Curriculum and implementation support stay close to the work.</h3>
                  <p>
                    illumios also draws on experienced operators and AI enablement
                    practitioners behind the scenes to keep the material grounded,
                    useful, and tied to real implementation.
                  </p>
                </aside>
              </div>

              <div className={styles.trustList}>
                {trustPoints.map((item) => (
                  <article key={item.title} className={styles.trustRow}>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.applySection} ${styles.sectionAlt}`} id="apply">
          <div className={styles.applyLayout}>
            <div className={styles.applyIntro}>
              <p className={styles.sectionLabel}>
                {APPLICATIONS_OPEN ? "Apply now" : "Join the waitlist"}
              </p>
              <h2>
                {APPLICATIONS_OPEN
                  ? "Start with the application. We will carry your details into the fit quiz."
                  : "Get first access when the founding cohort opens."}
              </h2>
              <p>
                {APPLICATIONS_OPEN
                  ? "The first step is intentionally simple. If the fit looks strong, the next step is payment and account setup, followed by calendar booking. If you want a phone call, we offer one as optional support."
                  : "Share your first name and email and we will send launch updates, founding cohort details, and the first enrollment invite when spots open."}
              </p>

              <div className={styles.faqShell}>
                <div className={styles.faqIntro}>
                  <p className={styles.offerBlockLabel}>
                    {APPLICATIONS_OPEN ? "Before you apply" : "Before you join"}
                  </p>
                  <h3>A few quick answers.</h3>
                </div>

                <div className={styles.faqList}>
                  {faqItems.map((item) => (
                    <article key={item.question} className={styles.faqItem}>
                      <h3>{item.question}</h3>
                      <p>{item.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.formShell}>
              <div className={styles.formIntro}>
                <p className={styles.offerBlockLabel}>
                  {APPLICATIONS_OPEN ? "Step 1 of 2" : "Priority list"}
                </p>
                <h3>
                  {APPLICATIONS_OPEN
                    ? "Tell us where to send your next steps."
                    : "Tell us where to send the opening details."}
                </h3>
                <p>
                  {APPLICATIONS_OPEN
                    ? "This starts your application and moves you into the fit quiz."
                    : "This saves your spot on the waitlist and keeps you in the first group to hear when enrollment opens."}
                </p>
              </div>
              <ApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
