"use client"

import { usePathname } from "next/navigation"
import { Definition_URL, Document_URL } from "@/data/constants"




import Sidebar from "@/components/sidebar"
import { highlightData } from "@/data/highlight_output";
import demotext from "@/data/demo_content_text"
import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";


export default function AiPage() {

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const myFunction = () => {
    setShowDialog(true);
    setDialogContent("Test");
  };

  // Split the paragraph into words
  const words = demotext.split(" ");

  // Apply highlighting and replacement to the specified words
  highlightData.forEach((highlight) => {
    words[highlight.start] = `
    
    <mark data-entity="person">${words.slice(highlight.start, highlight.end + 1).join(" ")}</mark>`;
  });

  // Join the words back into a paragraph
  const highlightedPara = words.join(" ");

  // // Join the words back into a paragraph
  // const highlightedPara = words.join(" ");

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


  var string = "";


  for (const obj of highlightData) {
    string += "<b><u>" + obj['keyword'] + "</u></b>" + " : " + obj['reason'] + "<br><br>";
  }
  return (
    <main className="flex h-full w-full flex-col gap-5 lg:flex-row items-start p-3">

      {loading ? (
        <div className="flex items-center justify-center w-full h-full p-33">
          <div className="text-center">
            <p>Loading...</p>
            <div className="loader"></div> {/* Circular loading indicator */}
          </div>
        </div>
      ) : (
        <>
          <Sidebar data={listOfDefinitions} />
          <div className="w-full p-22">
            {/* top center */}
            <div className="flex justify-center gap-5flex h-full w-full flex-col items-start justify-start gap-5 lg:flex-col p-3">
              {/* title: COntent */}
              <h1 className="text-5xl font-bold text-center">Content</h1>
              <div className="entities" dangerouslySetInnerHTML={{ __html: highlightedPara }} />
            </div>
            <Separator orientation="horizontal" className="w-full" />
            <br></br>
            <h2 className="text-3xl font-bold ">Analysis</h2>

            <br></br>

            <p dangerouslySetInnerHTML={{ __html: string }}></p>
          </div>

        </>
      )}
    </main>
  );
}


