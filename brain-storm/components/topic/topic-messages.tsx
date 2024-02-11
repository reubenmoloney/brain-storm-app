"use client";

import { useTopicMessageQuery } from "@/hooks/use-topic-message-query";
import { Member } from "@prisma/client";
import { Loader2, ServerCrashIcon } from "lucide-react";

//could reuse this to implement dms
interface TopicMessagesProps {
    name: string;
    member: Member;
    topicId: string; //this might need to be renamed to topicId
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "topicId"
    paramValue: string;
    type: "topic";
}

export const TopicMessages = ({
    name,
    member,
    topicId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type,
}: TopicMessagesProps) => {
    const queryKey = `chat:${topicId}`;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useTopicMessageQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-8 w-7 text-zinc-600 animate-spin my-4"/>
                <p className="text-xs text-zinc-600">
                    Loading Older Messages
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrashIcon className="h-8 w-7 text-zinc-600 my-4"/>
                <p className="text-xs text-zinc-600">
                    Failed to load messages
                </p>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <div className="text-xl md:text-3xl font-bold">
                This is the start of {name}.
            </div>
        </div>
    )
}