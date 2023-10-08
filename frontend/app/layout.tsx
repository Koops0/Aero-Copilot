import "@/styles/globals.css"
import { Metadata } from "next"
import Head from "next/head"
import NextTopLoader from "nextjs-toploader"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import "@aws-amplify/ui-react/styles.css"
import { Authenticator } from "@aws-amplify/ui-react"

import "@aws-amplify/ui-react/styles.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-w-screen h-screen min-h-screen w-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextTopLoader />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-w-screen relative flex min-h-screen w-screen flex-col">
              <SiteHeader />
              {/* <Authenticator>
                {({ signOut, user }) => ( */}
                  <div className="h-full flex-1 items-center justify-center">
                    {children}
                  </div>
                {/* )}
              </Authenticator> */}
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}