import { currentProfilePages } from "@/lib/current-profile-pages";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if ( req.method !== "POST") {
        return res.status(405).json({ error: "Method not alowed"})
    }

    try{
        const profile = await currentProfilePages(req);
        const { content, fileUrl, isMedia } = req.body;
        const { groupId, topicId } = req.query;

        if (!profile) {
            return res.status(401).json({error: "Unauthorized"});
        }
        if (!groupId) {
            return res.status(400).json({error: "Group Id Missing"});
        }
        if (!topicId) {
            return res.status(400).json({error: "Topic Id Missing"});
        }
        if (!content) {
            return res.status(400).json({error: "Content Missing"});
        }

        const group = await db.group.findFirst({
            where: {
                id : groupId as string,
                members: {
                    some: {
                        profileId: profile.id,
                    }
                }
            },
            include: {
                members: true
            }
        });

        if(!group){
            return res.status(404).json({message: "group not found"});
        }

        const topic = await db.topic.findFirst({
            where: {
                id: topicId as string,
                groupId: groupId as string,
            }
        });

        if(!topic){
            return res.status(404).json({message: "topic not found"});
        }

        const member = group.members.find((member) => member.profileId === profile.id);

        if(!member){
            return res.status(404).json({message: "member not found"});
        }

        if(!isMedia){
            const message = await db.message.create({
                data: {
                    content,
                    fileUrl: "",
                    topicId: topicId as string,
                    memberId: member.id as string,

                },
                include: {
                    member: {
                        include: {
                            profile: true,
                        }
                    }
                }
            });
            const topicKey = `chat:${topicId}:messages`;
            res?.socket?.server?.io?.emit(topicKey, message);
            return res.status(200).json(message);
        }
        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                topicId: topicId as string,
                memberId: member.id as string,
                isMedia: true

            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        const topicKey = `chat:${topicId}:messages`;
        res?.socket?.server?.io?.emit(topicKey, message);
        return res.status(200).json(message);

    } catch(error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error"});
    }
}
