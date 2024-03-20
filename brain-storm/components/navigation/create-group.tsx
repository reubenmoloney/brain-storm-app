"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { CreateGroupModal } from "../modals/create-group-modal";
//className="flex items-center justify-between py-2 bg-white rounded-sm my-2 border-[2px] hover:text-white border-rose-500 hover:bg-rose-100 pl-2
//flex flex-direction:row mx-3 h-[48px] w-[130px] rounded-[15px] group-hover:rounded-[10px] transition-all overflow-hidden items-center justify-center bg-background group-hover:bg-rose-500
//this opens the create group button when the user clicks on it
export const CreateGroup = () => {
    const { onOpen } = useModal();
    return(
        <div>
                <button
                    onClick={() => onOpen("createGroup")}
                    className="group flex items-center"
                >
                    <div className="flex items-center justify-between py-2 bg-white rounded-sm my-2 border-[2px] border-rose-500 hover:bg-rose-100 pl-2">
                        Create Group
                        <Plus 
                            className="transition text-rose-500"
                            size={20}
                        />
                    </div>
                </button>
        </div>
    )
}