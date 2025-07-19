import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TropiTech - Construction Management",
  description: "AI-powered construction management platform for the Bahamas",
  keywords: ["construction", "management", "Bahamas", "TropiTech", "AI"],
  authors: [{ name: "TropiTech Solutions" }],
  icons: {
    icon: [
      { url: "/logo/1.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/2.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo/1.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/logo/1.png" type="image/png" />
        <link rel="shortcut icon" href="/logo/1.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TropiTech" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen text-foreground font-sans`}
      >
        <Providers>
          <div className="relative min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}