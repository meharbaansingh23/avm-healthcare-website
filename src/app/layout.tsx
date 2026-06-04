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

export const metadata: Metadata = {
  title: "AVM Healthcare Products Pvt. Ltd.",
  description:
    "Advanced surgical instruments manufacturer and supplier based in New Delhi, India.",
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
