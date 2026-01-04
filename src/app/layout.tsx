import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DriveTest | Test Drive Booking Platform",
    template: "%s | DriveTest",
  },

  description:
    "DriveTest is a modern platform that allows customers to book car test drives easily and helps dealers manage bookings efficiently.",

  applicationName: "DriveTest",

  keywords: [
    "test drive",
    "car test drive",
    "car booking",
    "drive test platform",
    "car dealers",
    "vehicle test drive",
    "DriveTest",
  ],

  authors: [{ name: "Taha Ibrahim" }],
  creator: "Taha Ibrahim",
  publisher: "DriveTest",

  metadataBase: new URL("https://test-drive-ecru.vercel.app"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "DriveTest | Book Your Car Test Drive Easily",
    description:
      "Book car test drives online with ease. DriveTest connects customers with car dealers in a modern and simple way.",
    url: "https://test-drive-ecru.vercel.app",
    siteName: "DriveTest",
    images: [
      {
        url: "/bgWeb.png",
        width: 1200,
        height: 630,
        alt: "DriveTest - Car Test Drive Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DriveTest | Test Drive Booking Platform",
    description:
      "A modern test drive booking platform for customers and car dealers.",
    images: ["/bgWeb.png"],
    creator: "@drivetest",
  },

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

  category: "Automotive",

  icons: {
    icon: "/logoTestCar.ico",
    shortcut: "/logoTestCar-16x16.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  other: {
    "theme-color": "#dc2626", // red-600
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Provider>
          <AuthProvider>
            <Navbar />
            <div className="py-8 bg-white" />
            <main className="flex-1">{children}</main>

            <Footer />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
