"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

//this interface allows passing of the group id and name from where it is called to this file
interface GroupButtonProps {
    id: string;
    name: string;
    description: string;
};

//this button is displayed in the group-side-bar for each group. when clicked on it will bring the user to that group
export const GroupButton =({
    id,
    name,
    description,
}: GroupButtonProps) => {

    const params = useParams();
    const router = useRouter();

    //send user to group page
    const onClick = () => {
        router.push(`/groups/${id}`);
    }

    const groupLabel = `${description}`;
    return(
        <ActionTooltip side="right" align="center" label={groupLabel}>
            <button
                onClick={onClick}
                className="group relative flex items-center "
            >
                <div className={cn(
                    "relative group border-solid border-[2px] border-rose-600 bg-white flex mx-3 pl-[2px] h-[48px] w-[130px] rounded-[4px] group-hover:rounded=[16px] transition-all overflow-hidden",
                    params?.groupId === id && "bg-rose-200 border-dashed text-primary"
                )}>
                <div className="flex items-center justify-center">
                    {name}
                </div>
                </div>
            </button>
        </ActionTooltip>
    )
}