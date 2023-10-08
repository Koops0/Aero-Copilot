"use client"

import Link from "next/link"
import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Index from "@/components/index"
import Sidebar from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

import awsExports from "./aws-export"

Amplify.configure(awsExports)

export default function DashboardPage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-around gap-5  lg:flex-row">
      Dashboard
    </main>
  )
}
