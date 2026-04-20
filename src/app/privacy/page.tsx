import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | illumios",
  description:
    "How illumios collects, uses, and protects information submitted through the illumios website, application, fit quiz, payment, account setup, and booking process.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="April 17, 2026"
      intro={[
        "This Privacy Policy describes how illumios collects, uses, and protects information when you visit illumios.com, apply through our website, complete our fit quiz, complete payment or account setup, book your onboarding time, request an optional phone call, or otherwise engage with our programs and services.",
        "illumios currently uses a website application, fit quiz, payment and account setup, and calendar booking path. A phone call may be offered as optional support. This policy explains what information may be collected across that path and how we handle it.",
      ]}
      sections={[
        {
          heading: "1. Information We Collect",
          paragraphs: [
            "We collect information you provide directly, including your name, email address, phone number, business name, application details, fit quiz responses, scheduling details, payment-related status, and messages you submit through our website or related forms.",
            "We may also collect information automatically when you use our website, including your IP address, browser type, referring pages, pages visited, and device information.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          paragraphs: [
            "We use collected information to review applications, assess fit for our programs, personalize quiz outcomes and recommendations, process payment and account setup, coordinate calendar booking, handle optional phone support, deliver purchased services, send operational and educational communications, and improve our website, curriculum, and enrollment experience.",
            "We may also use your information to follow up on incomplete applications, confirm onboarding steps, and maintain records related to program participation and support.",
          ],
        },
        {
          heading: "3. SMS Communications",
          paragraphs: [
            "If you provide your phone number, you may receive SMS messages related to your application, scheduling, reminders, onboarding, and service-related communications. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance or contact info@illumios.com.",
          ],
        },
        {
          heading: "4. Sharing of Information",
          paragraphs: [
            "We do not sell, rent, or trade your personal information. We may share information with service providers that help us operate our business and deliver our programs, including CRM, scheduling, form, communication, payment, email, and hosting providers.",
            "We may also disclose information when required by law, to protect our rights, or to support fraud prevention, security, or compliance efforts.",
          ],
        },
        {
          heading: "5. Third-Party Tools",
          paragraphs: [
            "Our website and enrollment process may use third-party tools such as GoHighLevel for CRM and communications, scheduling tools, payment processors, analytics or hosting providers, and Google Fonts or similar web services. Those providers may process data according to their own privacy policies and terms.",
          ],
        },
        {
          heading: "6. Cookies and Analytics",
          paragraphs: [
            "We may use cookies and similar technologies to support core site functionality, remember preferences, understand traffic patterns, and improve site performance. You can manage cookie settings through your browser.",
          ],
        },
        {
          heading: "7. Data Retention",
          paragraphs: [
            "We retain your information for as long as reasonably necessary to operate our business, deliver services, support program administration, comply with legal obligations, resolve disputes, and enforce our agreements.",
            "If you want us to delete information you previously submitted, contact info@illumios.com. We may retain certain records when required for legal, tax, accounting, security, or operational reasons.",
          ],
        },
        {
          heading: "8. Security",
          paragraphs: [
            "We use reasonable administrative, technical, and organizational safeguards to protect your information. No method of internet transmission or electronic storage is completely secure, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "9. Your Rights and Choices",
          paragraphs: [
            "Depending on your location, you may have rights to request access to, correction of, or deletion of your personal information, and to opt out of certain communications. You can unsubscribe from marketing emails at any time using the link in the message or by contacting info@illumios.com.",
          ],
        },
        {
          heading: "10. Children’s Privacy",
          paragraphs: [
            "Our services are not directed to individuals under 18, and we do not knowingly collect personal information from children.",
          ],
        },
        {
          heading: "11. Changes to This Policy",
          paragraphs: [
            "We may update this Privacy Policy from time to time. When we do, we will update the effective date on this page. Your continued use of our website or services after changes become effective constitutes acceptance of the updated policy.",
          ],
        },
        {
          heading: "12. Contact",
          paragraphs: [
            "For privacy questions or requests, contact illumios at 135 Thomas Ave, Maple Shade, NJ 08052, (856) 329-3539, or info@illumios.com.",
          ],
        },
      ]}
    />
  );
}
