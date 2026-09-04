import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import "./faith.css";
import StoreProvider from "@/lib/StoreProvider";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxeStay | Hotels & Residences",
  description: "Thoughtful stays, beautiful spaces and personal hospitality at LuxeStay Hotels & Residences.",
  keywords: ["hotel", "luxury stay", "rooms", "hospitality", "reservations"],
  authors: [{ name: "LuxeStay Hospitality" }],
  openGraph: {
    title: "LuxeStay | Hotels & Residences",
    description: "Thoughtful stays, beautiful spaces and personal hospitality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <div className="cinematic-bg-container" />
          <div className="cinematic-overlay" />
          {children}
        </StoreProvider>

      </body>
    </html>
  );
}
