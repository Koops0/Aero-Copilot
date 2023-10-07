import React from "react"

import { Card } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const Sidebar: React.FC = () => {
  return (
    <aside className=" flex h-[75vh] justify-evenly w-full bg-primary-foreground lg:w-1/4 lg:flex-col">
      <Card className="">Suggestions</Card>
      <Card>Definitions</Card>
      <Card>Possible consequences</Card>
    </aside>
  )
}

export default Sidebar
