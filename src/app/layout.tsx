import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxeStay - Premium Hotel Management System",
  description: "Professional hotel management system with real-time bookings, guest services, and receptionist operations. Manage your hotel efficiently with our comprehensive platform.",
  keywords: ["hotel management", "booking system", "hospitality", "reservations"],
  authors: [{ name: "Hotel Management Team" }],
  openGraph: {
    title: "LuxeStay - Premium Hotel Management System",
    description: "Comprehensive hotel management platform for modern hospitality",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
