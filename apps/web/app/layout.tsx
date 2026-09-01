import React from "react"
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
import { siteDescription, siteName, siteUrl } from './site'
import './globals.css'

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: '--font-barlow',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: '--font-barlow-condensed',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "UMAKER | AI 原生量化市场智能",
    template: "%s | UMAKER",
  },
  description: siteDescription,
  keywords: [
    "量化交易",
    "市场智能",
    "AI 量化",
    "量化因子",
    "市场结构",
    "多周期分析",
    "策略研究",
    "策略定制",
    "API 托管",
  ],
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
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
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName,
    title: "UMAKER | AI 原生量化市场智能",
    description: siteDescription,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "UMAKER 量化市场智能" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMAKER | AI 原生量化市场智能",
    description: siteDescription,
    images: ["/og-image.png"],
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
