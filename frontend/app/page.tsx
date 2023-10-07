"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DashboardPage() {
  return (
    <main className="h-full w-full items-center bg-white">
      <section className=" float-left h-full w-3/4 bg-red-500">
        <Label htmlFor="pdf-text">Text of your PDF</Label>
        <Textarea id="pdf-text" className="" disabled />
      </section>
      <aside className=" float-right flex h-full w-1/4 flex-col justify-between bg-blue-500 ">
        <div className="">Suggestions</div>
        <div>Definitions</div>
      </aside>
    </main>
  )
}
