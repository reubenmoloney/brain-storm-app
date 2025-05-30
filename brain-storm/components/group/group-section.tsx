"use client";

import { GroupWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface GroupSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "topics" | "members";
    group?: GroupWithMembersWithProfiles;
};

export const GroupSection = ({
    label,
    role,
    sectionType,
    group,
}: GroupSectionProps) => {
    const { onOpen } = useModal();

    return(
        <div className="flex items-center justify-between py-2 bg-white rounded-sm my-2 border-[2px] hover:text-white border-rose-500 hover:bg-rose-100 pl-2">
            {role !== MemberRole.MEMBER && sectionType === "topics" &&(
                    <button 
                        className="flex flex-direction:row items-center text-zinc-500 transition"
                        onClick={() => onOpen("createTopic")}
                    >
                        {label}  <Plus className="h-4 w-4"/>
                    </button>
            )}
            {role === MemberRole.OWNER && sectionType === "members" && (
                <ActionTooltip label="Manage Members" side="top">
                    <button 
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        onClick={() => onOpen("members", { group })}
                    >
                        <Settings className="h-4 w-4"/>
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}