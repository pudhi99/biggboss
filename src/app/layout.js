import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Bigg Boss - Latest News, Contestant Profiles, and Voting Polls",
  description:
    "Stay up-to-date with the latest Bigg Boss news, get to know the contestants, and participate in exclusive voting polls. Our comprehensive Bigg Boss blog has everything you need to follow the show.",
  openGraph: {
    title: "Bigg Boss",
    description:
      "Your go-to source for Bigg Boss updates, contestant details, and interactive voting polls.",
    url: "", // Replace with your actual URL
    images: [
      {
        url: "", // Replace with your actual image URL
        width: 800,
        height: 600,
        alt: "Bigg Boss Contestants",
      },
    ],
    site_name: "Bigg Boss Blog",
  },
  twitter: {
    card: "summary_large_image",
    site: "@pudhi99", // Replace with your Twitter handle
    title: "Bigg Boss Blog",
    description:
      "Your go-to source for Bigg Boss updates, contestant details, and interactive voting polls.",
    image: "", // Replace with your actual image URL
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4777990936225991"
          crossOrigin="anonymous"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
