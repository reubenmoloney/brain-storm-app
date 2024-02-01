"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface GroupButtonProps {
    id: string;
    name: string;
};

export const GroupButton =({
    id,
    name
}: GroupButtonProps) => {

    const params = useParams();
    const router = useRouter();

    const onClick = () => {
        router.push(`/groups/${id}`);
    }

    const groupLabel = `Open ${name}`;
    return(
        <ActionTooltip side="right" align="center" label={groupLabel}>
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.groupId !== id && "group-hover:h-[20px]",
                    params?.groupId === id ? "h-[36px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[130px] rounded-[24px] group-hover:rounded=[16px] transition-all overflow-hidden",
                    params?.groupId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                <div className="flex items-center justify-center">
                    {name}
                </div>
                </div>
            </button>
        </ActionTooltip>
    )
}