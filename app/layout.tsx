import type React from "react"
import type { Metadata } from "next"
import { inter, orbitron } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "TropiTech Solutions - Next-Gen Software for The Bahamas",
  description: "Pioneering AI-powered software solutions and digital transformation for Caribbean businesses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
