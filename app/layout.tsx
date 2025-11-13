import type { Metadata } from "next";
import { Red_Rose } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const redrose = Red_Rose({
  variable: "--font-red-rose",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.synctom.com"),
  title: {
    default: "Synctom — Digital Solutions That Drive Innovation",
    template: "%s | Synctom",
  },
  description:
    "Transform your business with Synctom's expert web development, mobile apps, UI/UX design, and digital solutions. We build scalable products that help businesses grow.",
  keywords: [
    "Synctom",
    "web development",
    "mobile app development",
    "UI/UX design",
    "software development",
    "digital solutions",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://www.synctom.com",
    title: "Synctom — Digital Solutions That Drive Innovation",
    siteName: "Synctom",
    description:
      "Transform your business with Synctom's expert web development, mobile apps, UI/UX design, and digital solutions.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@synctom",
    creator: "@synctom",
    title: "Synctom — Digital Solutions That Drive Innovation",
    description:
      "Transform your business with Synctom's expert web development, mobile apps, UI/UX design, and digital solutions.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  themeColor: "#0ea5e9",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

import AuthProvider from "@/components/providers/session-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${redrose.className} max-w-340  mx-auto antialiased`}>
        <AuthProvider>
          <Header />
          <main className="pt-20">
            {children}
          </main>
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}
