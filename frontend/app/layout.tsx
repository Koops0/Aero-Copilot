"use client"
import "@/styles/globals.css"
import { createContext, useContext, useState } from "react"
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

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{siteConfig.name}</title>
          <meta name="description" content={siteConfig.description} />
        </head>
        <body
          className={cn(
            "min-w-screen h-screen min-h-screen w-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextTopLoader />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-w-screen relative flex min-h-screen w-screen flex-col">
              <Authenticator
                variation="modal"
                loginMechanisms={["email"]}
                signUpAttributes={["preferred_username"]}
              >
                {({ signOut, user }) => (
                  <>
                    <SiteHeader signOut={signOut}  user={user}/>

                    <div className="h-full flex-1 items-center justify-center">
                      {children}
                    </div>
                  </>
                )}
              </Authenticator>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
