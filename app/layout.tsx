import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import localFont from "next/font/local";
import favicon from "../public/icon.svg";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Wordamour — Personalised word search puzzle for your special someone",
  description:
    "Turn your cherished words into a beautiful, printed word search puzzle. Choose sweet nicknames, inside jokes, and treasured memories that mean the most to you both. A thoughtful gift that's uniquely yours.",
  metadataBase: new URL("https://wordamour.com"),
  openGraph: {
    title:
      "Wordamour — Personalised word search puzzle for your special someone",
    description:
      "Turn your cherished words into a beautiful, printed word search puzzle. Choose sweet nicknames, inside jokes, and treasured memories that mean the most to you both. A thoughtful gift that's uniquely yours.",
    url: "https://wordamour.com",
    siteName: "Wordamour",
    locale: "en_US",
    type: "website",
    images: "https://wordamour.com/meta.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Wordamour — Personalised word search puzzle for your special someone",
    description:
      "Turn your cherished words into a beautiful, printed word search puzzle. Choose sweet nicknames, inside jokes, and treasured memories that mean the most to you both. A thoughtful gift that's uniquely yours.",
    site: "@wordamour_com",
    images: "https://wordamour.com/meta.png",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        media: "(prefers-color-scheme: light)",
        type: "image/svg",
        url: favicon.src,
      },
      {
        rel: "icon",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
        url: favicon.src,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} lg:overflow-hidden antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-WCYN5PZ8R6" />
    </html>
  );
}
