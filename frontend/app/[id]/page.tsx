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
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { log } from "console"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function AiPage() {
  // create a get request to the api to get the text from the pdf https://k1yi2zozfg.execute-api.us-east-1.amazonaws.com/nasa/definitions/file_name1


  const [loading, setLoading] = useState(true);
  const [listOfDefinitions, setlistOfDefinitions] = useState([]);
  const [pdfText, setPdfText] = useState([]);

  // get filename from url
  const fileName = usePathname().split("/").pop();


  useEffect(() => {
    fetch(Document_URL + fileName)
      .then((res) => res.json())
      .then((data) => {
        setPdfText(data);


      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });

    fetch(Definition_URL + fileName)
      .then((res) => res.json())
      .then((data) => {
        setlistOfDefinitions(data);

        //wait for 10 seconds
        setTimeout(() => {
          setLoading(false);
        }, 1000);


      })
      .catch((error) => {
        console.error("Error fetching listOfDefinitions:", error);
      });
  }, [

  ]);



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

        <><Sidebar data={listOfDefinitions} /><section className="h-full max-h-[75vh]  w-full ">

          <Card className="h-full bg-secondary ">
            <CardHeader>
              <CardTitle className="flex flex-row justify-between">
                <p>Your Text</p>
                {/* check loading here as well */}

                <Index data={pdfText} />
              </CardTitle>
              <CardDescription>Text from the PDF</CardDescription>
            </CardHeader>

            <div className="flex flex-col items-center justify-center h-full">
              <Card>


              </Card>

            </div>
          </Card>
        </section></>
      )}
    </main>

  )
}