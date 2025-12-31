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
  title: "DriveTest - Test Drive Platform",
  description: "A modern test drive booking platform for customers and dealers",
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
            {/* Navbar */}
            <Navbar />
            <div className="py-8 bg-white" />
            <main className="flex-1">{children}</main>
            {/* Footer */}
            <Footer />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
