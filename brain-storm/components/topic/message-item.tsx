"use client";

import { Member, MemberRole, Profile } from "@prisma/client";
import { ActionTooltip } from "../action-tooltip";
import Image from "next/image";
import { Edit, FileIcon } from "lucide-react";

interface MessageItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    timestamp: string;
    fileUrl: string | null;
    isMedia: boolean;
    currentMember: Member;
    socketUrl: string;
    socketQuery: Record<string, string>
}

export const MessageItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    isMedia,
    currentMember,
    socketUrl,
    socketQuery
}: MessageItemProps) => {

    const fileType = fileUrl?.split(".").pop();
    if(!fileUrl){
        fileUrl = ""
    }
    const isOwner = currentMember.id === member.id;
    const canDelete = currentMember.role !== MemberRole.MEMBER || isOwner;
    const canEdit = isOwner && !isMedia;
    const isPDF = fileType === "pdf" && isMedia;
    const isImage = isMedia && !isPDF;

    return (
        <div className="relative group flex items-center hover:bg-black/5 py-1">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="flex flex-col w-full">
                    <div className="flex items-center">
                        <p className="font-semibold text-sm">
                            {member.profile.name}
                        </p>
                        <span className="text-xs text-zinc-500">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <div className="bg-secondary relative aspect-square mt-2 overflow-hidden border flex items-center h-48 w-48" >
                            <Image 
                                src={content}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                                <a 
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                                >
                                    PDF File
                                </a>
                        </div>
                    )}
                    {!isMedia && (
                        <>
                            {content}
                        </>
                    )}
                </div>
            </div>
            {canDelete && (
                <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white rounded-sm">
                    {canEdit && (
                        <ActionTooltip label="Edit">
                            <Edit 
                                className="hover:text-yellow"
                            />
                        </ActionTooltip>
                    )}
                </div>
            )}
        </div>
    )
}