"use client";

import { GroupWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Phone, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import CallButton from "./call-button";

interface GroupHeaderProps {
    group: GroupWithMembersWithProfiles;
    role?: MemberRole;
}

export const GroupHeader = ({
    group,
    role
}: GroupHeaderProps) => {
    const { onOpen } = useModal();

    const isOwner = role === MemberRole.OWNER;
    const isModerator = isOwner || role === MemberRole.MODERATOR;

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" asChild>
                    <button
                        className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                    >
                        {group.name}
                        <Settings className="h-5 w-5 ml-auto"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
                >
                    { isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("addMember", { group: group })}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            Add People
                            <UserPlus className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )}

                    { isOwner && (
                        <DropdownMenuItem
                            onClick={() => onOpen("editGroup", {group})}
                            className="pxwd-3 py-2 text-sm cursor-pointer"
                        >
                            Edit Group
                            <Settings className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )}

                    { isOwner && (
                        <DropdownMenuItem
                        onClick={() => onOpen("members", {group})}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            Manage Members
                            <Users className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )}

                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    
                    

                    { isOwner && (
                        <DropdownMenuItem
                            onClick={() => onOpen("deleteGroup", { group })}
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        >
                            Delete Group
                            <Trash className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )}

                    {!isOwner && (
                        <DropdownMenuItem
                        onClick={() => onOpen("leaveGroup", { group })}
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        >
                            Leave Group
                            <LogOut className="h-4 w-4 ml-auto"/>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}