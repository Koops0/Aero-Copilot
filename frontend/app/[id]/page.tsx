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
import Index from "@/components/index"
import Sidebar from "@/components/sidebar"
import { Authenticator } from "@aws-amplify/ui-react"
import { Definition_URL, Document_URL } from "@/data/constants"

export default function AiPage() {
  // create a get request to the api to get the text from the pdf https://k1yi2zozfg.execute-api.us-east-1.amazonaws.com/nasa/definitions/file_name1

  const fileName = "file_name1";
  const definitions = fetch(Definition_URL + fileName).then((res) => res.json());
  const pdfContent = fetch(Document_URL + fileName).then(function (res) {
    return res.json()
  });

  console.log(definitions);
  console.log(pdfContent);


  return (

    <main className="flex h-full w-full flex-col items-center justify-center gap-5  lg:flex-row">
      <Sidebar />
      <section className="h-full max-h-[75vh]  w-full lg:w-3/4">
        <Card className="h-full bg-secondary ">
          <CardHeader>
            <CardTitle className="flex flex-row justify-between">
              <p>Your Text</p>
              <Index />
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
