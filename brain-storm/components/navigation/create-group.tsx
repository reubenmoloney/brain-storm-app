"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { CreateGroupModal } from "../modals/create-group-modal";

export const CreateGroup = () => {
    const { onOpen } = useModal();
    return(
        <div>
                <button
                    onClick={() => onOpen("createGroup")}
                    className="group flex items-center"
                >
                    <div className="flex flex-direction:row mx-3 h-[48px] w-[130px] rounded-[15px] group-hover:rounded-[10px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-rose-500">
                        Create Group
                        <Plus 
                            className="group-hover:text-white transition text-rose-500"
                            size={20}
                        />
                    </div>
                </button>
        </div>
    )
}