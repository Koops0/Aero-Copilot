"use client"

import Link from "next/link"
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
import { Document_URL } from "@/data/constants"
import { useState, useEffect } from "react"; // Import useState and useEffect

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
    <main className="flex h-full w-full flex-col items-center justify-around gap-5 lg:flex-row">
      {loading ? (
        <p>Loading...</p>
      ) : (
        listOfPdfs.map((pdfFileName) => (
          <Card
            className="w-[30%] bg-secondary cursor-pointer"
            onClick={() => handleCardClick(pdfFileName)}
            key={pdfFileName}
          >
            <CardHeader>
              <CardTitle className="flex flex-row justify-between">
                {pdfFileName}
              </CardTitle>
              {/* Add any additional information you want to display */}
            </CardHeader>
          </Card>
        ))
      )}
    </main>
  );
}