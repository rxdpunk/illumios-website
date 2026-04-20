import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://illumios.com"),
  title: {
    default: "illumios | Live AI Training for Business Owners",
    template: "%s | illumios",
  },
  description:
    "illumios helps business owners, entrepreneurs, and independent professionals cut busywork, build one useful AI workflow, and leave with a practical 30-day plan through live weekly classes.",
  applicationName: "illumios",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "illumios | Live AI Training for Business Owners",
    description:
      "Apply through illumios and move from website application to fit quiz to enrollment for a live AI training program built around one useful workflow.",
    type: "website",
    url: "https://illumios.com",
    siteName: "illumios",
  },
  twitter: {
    card: "summary_large_image",
    title: "illumios",
    description:
      "Live AI training for business owners. Build one useful workflow, reduce busywork, and leave with a practical 30-day plan.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1B4B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  );
}
