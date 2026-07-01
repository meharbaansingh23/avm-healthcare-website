import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Body + display typeface.
// Design system calls for Helvetica Neue. We self-host Inter via next/font as a
// high-quality fallback so non-Apple devices render a close substitute rather
// than a generic system sans. The CSS font stack (globals.css) lists
// "Helvetica Neue" first, then this Inter variable, then system fallbacks.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_DESCRIPTION =
  "AVM Healthcare Products Pvt. Ltd. — a New Delhi-based manufacturer of premium surgical instruments developed in German collaboration, supplying premier institutions across India and worldwide since 1996.";

export const metadata: Metadata = {
  metadataBase: new URL("https://avmhealthcare.com"),
  title: {
    default: "AVM Healthcare — Precision Surgical Instruments Since 1996",
    template: "%s | AVM Healthcare",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "surgical instruments",
    "AVM Healthcare",
    "medical devices India",
    "German collaboration",
    "neurosurgical instruments",
    "cardiovascular instruments",
    "gynaecology instruments",
    "orthopaedic instruments",
    "surgical equipment manufacturer",
  ],
  authors: [{ name: "AVM Healthcare Products Pvt. Ltd." }],
  openGraph: {
    title: "AVM Healthcare — Precision Surgical Instruments Since 1996",
    description: SITE_DESCRIPTION,
    url: "https://avmhealthcare.com",
    siteName: "AVM Healthcare",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AVM Healthcare — Surgical Instruments",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVM Healthcare — Precision Surgical Instruments Since 1996",
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://avmhealthcare.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0A1628]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
