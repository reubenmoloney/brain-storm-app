"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { Edit, FileIcon, Reply, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
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
};

const formSchema = z.object({
    content: z.string().min(1),
  });

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

    const [isEditing, setIsEditing] = useState(false);
    const { onOpen } = useModal();
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (event: any) => {
        if (event.key === "Escape" || event.keyCode === 27) {
            setIsEditing(false);
        }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keyDown", handleKeyDown);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        content: content
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        const url = qs.stringifyUrl({
            url: `${socketUrl}/${id}`,
            query: socketQuery,
        });

        await axios.patch(url, values);

        form.reset();
        setIsEditing(false);
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        form.reset({
        content: content,
        })
    }, [content]);

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
                            <FileIcon className="h-10 w-10 fill-zinc-800 stroke-indigo-400" />
                                <a 
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-2 text-sm text-zinc-500 hover:underline"
                                >
                                    PDF File
                                </a>
                        </div>
                    )}
                    {!isMedia && !isEditing && (
                        <>
                            {content}
                        </>
                    )}
                    {!isMedia && isEditing && (
                        <Form {...form}>
                        <form 
                            className="flex items-center w-full gap-x-2 pt-2"
                            onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                    <div className="relative w-full">
                                        <Input
                                        disabled={isLoading}
                                        className="p-2 bg-zinc-200/90 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600"
                                        placeholder="Edited message"
                                        {...field}
                                        />
                                    </div>
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <Button disabled={isLoading} size="sm" variant="default">
                                Save
                            </Button>
                        </form>
                        </Form>
                    )}
                </div>
            </div>
            <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white rounded-sm">
            
            {canDelete && (
                <>
                    {canEdit && (
                        <ActionTooltip label="Edit">
                            <Edit
                                onClick={() => setIsEditing(true)}
                                className="hover:text-yellow"
                            />
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="Delete">
                            <Trash 
                                onClick={() => onOpen("deleteMessage", { 
                                    apiUrl: `${socketUrl}/${id}`,
                                    query: socketQuery,
                                   })}
                                className="hover:text-rose-500"
                            />
                    </ActionTooltip>
                    </>
            )}
            </div>
        </div>
    )
}
/*
<ActionTooltip label="Reply">
                            <Reply 
                                className="hover:text-yellow"
                            />
            </ActionTooltip>
*/