"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DashboardPage() {
  return (
    <main className="h-full w-full items-center bg-white">
      <aside className="top-50 sticky z-20 float-right flex h-full w-full justify-between bg-blue-500 lg:w-1/4  lg:flex-col">
        <div className="">Suggestions</div>
        <div>Definitions</div>
      </aside>
      <section className=" float-left    h-[100vh] w-full bg-red-500 lg:w-3/4">
        <Label htmlFor="pdf-text">Text of your PDF</Label>
        <Textarea id="pdf-text" className="max-h-full max-w-full" disabled />
      </section>
    </main>
  )
}
