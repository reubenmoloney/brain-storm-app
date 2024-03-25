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
        const { content } = req.body;
        const { groupId, topicId, messageId } = req.query;

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
        if(!messageId){
            return res.status(400).json({error: "Message- Missing"});
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
            },
            include: {
                messages: true
            }
        });

        if(!topic){
            return res.status(404).json({message: "topic not found"});
        }

        const member = group.members.find((member) => member.profileId === profile.id);

        if(!member){
            return res.status(404).json({message: "member not found"});
        }

        const message = topic.messages.find((message) => message.id === messageId);

        if(!message){
            return res.status(404).json({message: "message not found"});
        }

        const reply = await db.subMessage.create({
            data: {
                content,
                messageId: messageId as string,
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
        const topicKey = `chat:${topicId}:replys`;
        res?.socket?.server?.io?.emit(topicKey, reply);
        return res.status(200).json(reply);
        
    

    } catch(error) {
        console.log("[MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error"});
    }
}
