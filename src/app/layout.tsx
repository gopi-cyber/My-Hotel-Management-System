import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { CustomCursor } from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VORTEX HOSPITALITY - Premium Nexus Control",
  description: "Professional hospitality management system with real-time neural telemetry, guest registries, and nexus administrative control. Powering the next generation of seamless hotel operations.",
  keywords: ["hotel management", "vortex", "nexus", "hospitality", "telemetry"],
  authors: [{ name: "Vortex DevOps Team" }],
  openGraph: {
    title: "VORTEX HOSPITALITY - Premium Nexus Control",
    description: "The ultimate nexus for modern hospitality management and neural telemetry.",
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
          <div className="cinematic-bg-container" />
          <div className="cinematic-overlay" />
          <CustomCursor />
          {children}
        </StoreProvider>

      </body>
    </html>
  );
}
