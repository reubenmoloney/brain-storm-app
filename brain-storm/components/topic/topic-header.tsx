import { Hash, Menu } from "lucide-react";

//import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";

interface TopicHeaderProps {
  groupId: string;
  name: string;
  imageUrl?: string;
}

export const TopicHeader = ({
  groupId,
  name,
  imageUrl
}: TopicHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 border-b-2">
        <Menu />
      <p className="font-semibold text-md text-black ">
        {name}
      </p>
      <div className="ml-auto flex items-center">
      <SocketIndicator />
      </div>
      
    </div>
  )
}