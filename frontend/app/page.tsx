"use client"

import { Amplify } from "aws-amplify"

import awsExports from "@/config/aws-export"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { Document_URL } from "@/data/constants"
import { useState, useEffect } from "react"; // Import useState and useEffect
import { FileText } from "lucide-react";




Amplify.configure(awsExports)

//
export default function DashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [listOfPdfs, setListOfPdfs] = useState([]);

  const handleCardClick = (pdfFileName: string) => {
    router.push(pdfFileName);
  };

  useEffect(() => {
    fetch(Document_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.documents && Array.isArray(data.documents)) {
          setListOfPdfs(data.documents);
          setLoading(false);
        } else {
          console.error("Invalid response format");
        }
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
      });
  }, []);

  return (
    <main className="flex h-full w-full flex-row items-center justify-around gap-5 lg:flex-col">

      <h1 className="text-3xl font-bold">PDF Documents</h1>
      {/* new line */}
      <p className="text-xl font-bold">Click on a document to view it</p>


      <div className="flex h-full w-full flex-col items-center justify-around gap-5 lg:flex-row">


        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <p>Loading...</p>
              <div className="loader"></div> {/* Circular loading indicator */}
            </div>
          </div>
        ) :


          (


            listOfPdfs.map((pdfFileName) => (
              <Card
                className="w-[30%] bg-secondary cursor-pointer"
                onClick={() => handleCardClick(pdfFileName)}
                key={pdfFileName}
              >

                <CardHeader>
                  <CardTitle className="flex flex-row items-center gap-5">
                    <FileText size={29} />
                    {pdfFileName}
                  </CardTitle>
                  {/* Add any additional information you want to display */}
                </CardHeader>
              </Card>
            ))
          )
        }
      </div>
    </main>
  );
}