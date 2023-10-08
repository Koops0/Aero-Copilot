"use client"

import { redirect, useRouter } from "next/navigation"
import { StorageManager } from "@aws-amplify/ui-react-storage"

import "@aws-amplify/ui-react/styles.css"
import { Button } from "@/components/ui/button"

export const DefaultStorageManagerExample = () => {
  const router = useRouter()
  return (
    <StorageManager
      acceptedFileTypes={[".pdf"]}
      accessLevel="public"
      maxFileCount={1}
      isResumable
      onUploadSuccess={() => {
        router.push("/")
      }}
    />
  )
}

export default DefaultStorageManagerExample
