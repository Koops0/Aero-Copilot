"use client"

import Link from "next/link"
import listOfPdfs from "@/data/list-of-PDFs"
import { Authenticator } from "@aws-amplify/ui-react"
import { Amplify, Auth } from "aws-amplify"
import { Car } from "lucide-react"

import awsExports from "@/config/aws-export"
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
import { useRouter } from "next/navigation";
import RootLayout from "./layout"

Amplify.configure(awsExports)

export default function DashboardPage() {

  const router = useRouter();

  const handleCardClick = (pdfId : string) => {
    router.push(pdfId);
  };
  return (

        <main className="flex h-full w-full flex-col items-center justify-around gap-5  lg:flex-row">


          {listOfPdfs.map((pdf) => (

            <Card className="w-[30%] bg-secondary cursor-pointer " onClick={() => handleCardClick(pdf.title)}>
              <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                  {pdf.title}
                </CardTitle>
                <CardDescription>{pdf.date_added}</CardDescription>
              </CardHeader>
            </Card>
          ))}
          </main>

  )
}
