"use client";

import { Member } from "@prisma/client";

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
    return (
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1"/>
            <div className="text-xl md:text-3xl font-bold">
                This is the start of {name}.
            </div>
        </div>
    )
}