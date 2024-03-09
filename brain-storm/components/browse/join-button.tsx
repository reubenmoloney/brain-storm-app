"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { CreateGroupModal } from "../modals/create-group-modal";
import { Group } from "@prisma/client";

interface JoinButtonProps{
    group: Group
}

export const JoinButton = ({group}:JoinButtonProps) => {
    const { onOpen } = useModal();
    return(
        <button 
                        onClick={() => onOpen("joinGroup", {group: group})}
                        className="bg-zinc-200 p-1 rounded-lg hover:bg-zinc-50 ml-auto"
                    >
                        Join
        </button>
    )
}