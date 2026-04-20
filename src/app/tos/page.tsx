import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | illumios",
  description:
    "Terms governing use of illumios.com, applications through illumios, purchases, account creation, calendar booking, and related education-first AI services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="April 17, 2026"
      intro={[
        "These Terms of Service govern your use of illumios.com and any programs or services provided by illumios. By accessing our website, submitting an application, completing the fit quiz, completing payment or account setup, booking your onboarding time, requesting an optional phone call, purchasing a program from illumios, or otherwise engaging our services, you agree to be bound by these Terms.",
        "The standard enrollment path is website application, fit quiz, payment and account setup, and calendar booking. A phone call may be offered as optional support when requested or useful.",
      ]}
      sections={[
        {
          heading: "1. Services",
          paragraphs: [
            "illumios provides education-first AI training, live group programs, enrollment support, implementation guidance, and related services for business owners, entrepreneurs, and independent professionals. Specific deliverables, session schedules, timelines, and pricing may be described in enrollment materials, invoices, onboarding documents, or separate written agreements.",
          ],
        },
        {
          heading: "2. Eligibility",
          paragraphs: [
            "You must be at least 18 years old and legally capable of entering into a binding agreement to use our website or purchase our services.",
          ],
        },
        {
          heading: "3. Payment Terms and Refunds",
          paragraphs: [
            "Program pricing, payment timing, and any payment plan details will be presented before purchase. Unless stated otherwise in writing, all fees are due as agreed and are non-refundable once payment is made.",
            "For our current live program, enrollment is non-refundable after payment. Missing a live session does not create refund eligibility. If a participant misses a session, the default make-good path is replay access and any support included with the offer. In limited situations, illumios may choose to offer a one-time future program transfer, but that is discretionary and not guaranteed.",
            "We reserve the right to suspend or deny access to services for failed payments, chargebacks, or overdue balances.",
          ],
        },
        {
          heading: "4. Participant Responsibilities",
          paragraphs: [
            "You agree to provide accurate information, complete required onboarding steps, use the services lawfully, and participate in a respectful manner. You are responsible for your own business decisions, tool choices, implementation steps, and results from using any ideas, prompts, workflows, or recommendations shared through our services.",
          ],
        },
        {
          heading: "5. Intellectual Property",
          paragraphs: [
            "All curriculum, frameworks, templates, training materials, prompts, worksheets, recordings, and proprietary methods provided by illumios remain the intellectual property of illumios unless a separate written agreement states otherwise.",
            "Upon receipt of full payment, any custom deliverables created specifically for you under a separate paid engagement may become your property as outlined in the applicable agreement. Unless explicitly granted in writing, you may not reproduce, resell, republish, or distribute our materials beyond your own internal personal or business use.",
          ],
        },
        {
          heading: "6. Confidentiality",
          paragraphs: [
            "We treat non-public client information as confidential and will not disclose it to third parties except as needed to deliver services, as required by law, or as otherwise permitted under our Privacy Policy or written agreements.",
            "Because live group programs involve participation with other attendees, you acknowledge that other participants may hear or see information shared during group sessions. You should use good judgment before disclosing sensitive business or personal information in those settings.",
          ],
        },
        {
          heading: "7. No Guarantee of Results",
          paragraphs: [
            "illumios does not guarantee any specific business, financial, operational, or revenue outcome. Examples, frameworks, and recommendations are provided for educational purposes and must be evaluated by you based on your own circumstances.",
          ],
        },
        {
          heading: "8. Limitation of Liability",
          paragraphs: [
            "To the fullest extent permitted by law, illumios will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website or services.",
            "Our total liability for any claim relating to the services will not exceed the amount you paid to illumios during the 30 days immediately preceding the event giving rise to the claim.",
          ],
        },
        {
          heading: "9. Third-Party Tools and Platforms",
          paragraphs: [
            "Our services may reference or involve third-party platforms, software, or AI tools. We are not responsible for third-party terms, outages, pricing changes, policy changes, outputs, or performance.",
          ],
        },
        {
          heading: "10. Termination",
          paragraphs: [
            "We may suspend or terminate access to our website or services if you violate these Terms, engage in abusive or unlawful conduct, misuse our intellectual property, or interfere with delivery of the program.",
            "Either party may terminate a separate service engagement according to the notice terms in the applicable written agreement. You remain responsible for fees already incurred or committed before termination.",
          ],
        },
        {
          heading: "11. Governing Law",
          paragraphs: [
            "These Terms are governed by the laws of the State of New Jersey, without regard to conflict of law principles. Any dispute relating to these Terms or our services will be resolved in the state or federal courts serving Burlington County, New Jersey, and you consent to that venue and jurisdiction.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            "For questions about these Terms, contact illumios at 135 Thomas Ave, Maple Shade, NJ 08052, (856) 329-3539, or info@illumios.com.",
          ],
        },
      ]}
    />
  );
}
