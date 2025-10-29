import type React from "react"
export const dynamic = "force-dynamic"
import type { Metadata } from "next"
import { Inter, Lora, DM_Sans, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Narra · Oral History Archive",
  description: "Curate, map, and publish oral history interviews with Supabase and Next.js.",
  metadataBase: new URL("https://narra.app"),
  authors: [{ name: "Narra" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={`${inter.variable} ${lora.variable} ${dmSans.variable} ${bebas.variable} font-sans antialiased`} suppressHydrationWarning>
  <Header />
  <main className="min-h-[calc(100vh-200px)] pt-12">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
