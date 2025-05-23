"use server"

import { MetadataRoute } from "next"

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://trysubtext.vercel.app"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}
