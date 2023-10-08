import { Card, CardContent, CardDescription, CardTitle } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Textarea } from "./ui/textarea"

const Sidebar = () => {

  return (
    <aside className=" flex h-[40vh] lg:h-[80vh] gap-10 w-full justify-evenly bg-primary-foreground lg:w-1/4 lg:flex-col">
      <Card className="w-1/3 h-full lg:h-1/3 lg:w-full p-5">
        <CardTitle>Suggestions</CardTitle>
        <CardDescription>Suggestions from ML model</CardDescription>
        <CardContent className="h-full overflow-y-auto">
          {/* <ScrollArea className="h-full"> */}
            okester began sneaking into the castle in the middle of the night
            and leaving jokes all over the place: under the king's pillow, in
            his soup, even in the royal toilet. The king was furious, but he
            couldn't seem to stop Jokester. And then, one day, the people of the
            kingdom discovered that the jokes left by Jokester were so funny
            that they couldn't help but laugh. And once they started laughing,
            they couldn't stop.
          {/* </ScrollArea> */}
        </CardContent>
      </Card>
      <Card className="w-1/3 h-full lg:h-1/3 lg:w-full p-5">
        <CardTitle>Definitions</CardTitle>
      </Card>
      <Card className="w-1/3 h-full lg:h-1/3 lg:w-full p-5 ">
        <CardTitle>Possible Consequences</CardTitle>
      </Card>
    </aside>
  )
}

export default Sidebar
