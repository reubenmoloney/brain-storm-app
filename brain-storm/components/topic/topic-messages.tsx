"use client";

import { useTopicMessageQuery } from "@/hooks/use-topic-message-query";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrashIcon } from "lucide-react";
import { Fragment } from "react";
import { MessageItem } from "./message-item";
import { format } from "date-fns";
import { useChatSocket } from "@/hooks/use-topic-message-socket";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}
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
    const queryKey = `chat:${topicId}`
    const addKey = `chat:${topicId}:messages`;
    const updateKey = `chat:${topicId}:messages:update`;

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
    useChatSocket({queryKey, addKey, updateKey});

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-8 w-7 text-zinc-600 animate-spin my-4"/>
                <p className="text-xs text-zinc-600">
                    Loading Messages
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
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            <MessageItem
                                id={message.id}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                isMedia={message.isMedia}
                                member={message.member}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                                currentMember={member}
                                key={message.id}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}