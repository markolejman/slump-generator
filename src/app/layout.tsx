import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markos bingo number generator",
  description: "Beautiful, non-repeating bingo number generator with animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Background image with dark overlay */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage:
              "url('https://via.tt.se/data/images/00037/2a1c7bfb-56a9-4fd1-b06a-205833975e49.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="fixed inset-0 -z-10 bg-black/60" />

        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
