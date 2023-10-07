"use client"

import Link from "next/link"

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
import  Index  from "@/components/index"
import Sidebar from "@/components/sidebar"

export default function DashboardPage() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-5  lg:flex-row">
      <Sidebar/>
      <section className="h-full max-h-[75vh]  w-full lg:w-3/4">
        <Card className="h-full bg-secondary ">
          <CardHeader>
            <CardTitle className="flex flex-row justify-between">
              <p>Your Text</p>
              <Index/>
            </CardTitle>
            <CardDescription>Text from the PDF</CardDescription>
          </CardHeader>
          <Textarea
            id="pdf-text"
            className="box-border h-[75vh] max-h-[75vh] max-w-full"
          />
        </Card>
      </section>
    </main>
  )
}
