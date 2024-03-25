"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

import "@livekit/components-styles";

import { Group } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface MediaRoomProps {
    groupId: string;
}

export const MediaRoom = ({groupId}: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState();

    useEffect(() => {
        if (!user?.firstName || !user.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try{
                const resp = await fetch(`/api/livekit?room=${groupId}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
            } catch(e){
                console.log(e);
            }
        })()
    }, [user?.firstName, user?.lastName, groupId]);

    if(token === ""){
        return (
            <div>
                <Loader2 className="h-10 w-10 animate-spin" />
                JOINING...
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            audio={true}
            video={false}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}