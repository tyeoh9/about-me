import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.description,
  openGraph: {
    type: "profile",
    title: profile.name,
    description: profile.description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: profile.name,
    description: profile.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9F6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body>{children}</body>
    </html>
  );
}
