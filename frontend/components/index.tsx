import React from "react"
import tableOfContents from "@/data/table-of-contents"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"



const Index: React.FC<any> = ({ data }) => {

  const [loadedData, setloadedData] = React.useState(data)

  console.log(data.data)
  return (
    <Sheet>
      <SheetTrigger>
        <Button>Index</Button>
      </SheetTrigger>
      <SheetContent className="w-[1000px] sm:w-[1040px]">
        <SheetHeader>
          <SheetTitle>INDEX</SheetTitle>
          <SheetDescription>
            <Accordion type="single" collapsible>
              {Object.entries(data.data).map(
                ([section, details]) => (
                  <AccordionItem value={section}>
                    <AccordionTrigger>{section}</AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(details as { [key: string]: unknown }).map(([key, value]) => (
                        <div>{key}</div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>

          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default Index
