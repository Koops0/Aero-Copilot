"use client"

import { log } from "console"
import { ReactNode, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Definition_URL, Document_URL } from "@/data/constants"
import { Authenticator } from "@aws-amplify/ui-react"

import { siteConfig } from "@/config/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Index from "@/components/index"
import Sidebar from "@/components/sidebar"
import  highlightData  from "@/data/highlight_output";
import demotext from "@/data/demo_content_text"


export default function AiPage() {
  const codeRef = useRef<HTMLModElement>(null);

  // Split the paragraph into words
  const words = demotext.split(" ");

  // Apply highlighting and replacement to the specified words
  highlightData.forEach((highlight) => {
    words[highlight.start] = `<span className="underline text-red-500" title="${highlight.reason}">${words.slice(highlight.start, highlight.end + 1).join(" ")}</span>`;
    words.fill("", highlight.start + 1, highlight.end + 1);
  });

  // Join the words back into a paragraph
  const highlightedPara = words.join(" ");

  console.log('---------------------------------')
  console.log(highlightData);

  const [loading, setLoading] = useState(true)
  const [listOfDefinitions, setlistOfDefinitions] = useState([])
  const [pdfText, setPdfText] = useState([])

  // get filename from url
  const fileName = usePathname().split("/").pop()

  useEffect(() => {
    fetch(Document_URL + fileName)
      .then((res) => res.json())
      .then((data) => {
        setPdfText(data)
      })
      .catch((error) => {
        console.error("Error fetching documents:", error)
      })

    fetch(Definition_URL + fileName)
      .then((res) => res.json())
      .then((data) => {
        setlistOfDefinitions(data)

        //wait for 10 seconds
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
      .catch((error) => {
        console.error("Error fetching listOfDefinitions:", error)
      })
  }, [])




  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-5  lg:flex-row">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center">
            <p>Loading...</p>
            <div className="loader"></div> {/* Circular loading indicator */}
          </div>
        </div>
      ) : (
        <>
          <Sidebar data={listOfDefinitions} />
          <section className="h-full max-h-[75vh]  w-full ">
            <Card className="h-full bg-secondary ">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                  <p>Your Text</p>
                  {/* check loading here as well */}

                  <Index data={pdfText} />
                </CardTitle>
                <CardDescription>Text from the PDF</CardDescription>
              </CardHeader>
              <CardContent className="h-full overflow-y-auto">
              <Textarea
                  disabled
                  className="h-full"
                  value={demotext as string}
                />
                {/* <Textarea
                  disabled
                  className="h-full"
                  value={highlightedPara as string}
                /> */}
                <p dangerouslySetInnerHTML={{ __html: highlightedPara }} />
              </CardContent>
            </Card>
          </section>
        </>
      )}
    </main>
  )
}
