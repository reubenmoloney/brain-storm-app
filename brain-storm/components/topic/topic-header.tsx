import { MobileToggle } from "@/components/mobile-toggle";

interface TopicHeaderProps {
  groupId: string;
  name: string;
}

export const TopicHeader = ({
  groupId,
  name,
}: TopicHeaderProps) => {
  return (
    <div className="text-md font-semibold z-10 px-3 flex items-center h-12 fixed border-neutral-200 border-b-2">
        <MobileToggle groupId={groupId} />
      <p className="font-semibold text-md text-black ">
        {name}
      </p>
    </div>
  )
}