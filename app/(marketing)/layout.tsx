/*
<ai_context>
This layout provides a shared structure for (marketing) routes.
</ai_context>
*/

import { ThemeProvider } from "@/components/utilities/theme-provider"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import { Inter as FontSans } from "next/font/google"
import React from "react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
}

export const metadata: Metadata = {
  title: "Subtext.ai | Instant Audience Research",
  description:
    "Subtext provides instant audience research, mining real conversations for authentic language & pain points. Write better, faster with verifiable insights. Get early access!"
}

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "min-h-screen overflow-x-hidden bg-white font-sans antialiased",
        fontSans.variable
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light" // Force light theme as per design inspiration
        enableSystem={false} // Disable system theme preference
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  )
}
