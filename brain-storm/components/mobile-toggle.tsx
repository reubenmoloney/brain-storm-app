import { Menu } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-side-bar";
import { GroupSidebar } from "@/components/group/group-side-bar";

export const MobileToggle = ({
  groupId
}: {
  groupId: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[200px]">
          <NavigationSidebar />
        </div>
        <GroupSidebar groupId={groupId} />
      </SheetContent>
    </Sheet>
  )
}