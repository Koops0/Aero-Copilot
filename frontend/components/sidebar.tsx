import { Separator } from "@/components/ui/separator"

import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect } from "react"


interface SidebarProps {
  data?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ data }) => {

  console.log("data to sidebar page", data);


  return (
    <aside className=" flex h-full lg:h-[80vh] gap-10 w-full justify-evenly bg-primary-foreground lg:w-1/4 lg:flex-col">

      <Card className="w-full h-full lg:h-full lg:w-full p-5">
        <CardTitle>Definitions</CardTitle>
        <CardContent className="h-full overflow-y-auto">
          {/* <ScrollArea className="max-h-[15vh]"> */}
          {Object.entries(data.definitions).map(([key, content]) => (
            <>
              <Dialog>
                <DialogTrigger>{key}</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{key}</DialogTitle>
                    <DialogDescription>
                      {content as string}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Separator className="my-2" />
            </>
          ))}
          {/* </ScrollArea> */}
        </CardContent>
      </Card>
      {/* <Card className="w-1/3 h-full lg:h-1/3 lg:w-full p-5 ">
        <CardTitle>Possible Consequences</CardTitle>
      </Card> */}
    </aside>
  )
}

export default Sidebar
