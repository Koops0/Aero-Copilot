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

const Index: React.FC = () => {

  
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
              {Object.entries(tableOfContents.data).map(
                ([section, details]) => (
                  <AccordionItem value={section}>
                    <AccordionTrigger>{section}</AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(details).map(([key, value]) => (
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
