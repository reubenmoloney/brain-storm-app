import { NextApiRequest } from "next";
import { MemberRole } from "@prisma/client";

import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { messageId, groupId, topicId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!groupId) {
      return res.status(400).json({ error: "group ID missing" });
    }

    if (!topicId) {
      return res.status(400).json({ error: "topic ID missing" });
    }

    const group = await db.group.findFirst({
      where: {
        id: groupId as string,
        members: {
          some: {
            profileId: profile.id,
          }
        }
      },
      include: {
        members: true,
      }
    })

    if (!group) {
      return res.status(404).json({ error: "group not found" });
    }

    const topic = await db.topic.findFirst({
      where: {
        id: topicId as string,
        groupId: groupId as string,
      },
    });
  
    if (!topic) {
      return res.status(404).json({ error: "topic not found" });
    }

    const member = group.members.find((member) => member.profileId === profile.id);

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        topicId: topicId as string,
      },
      include: {
        member: {
          include: {
            profile: true,
          }
        }
      }
    })


    if (!message) {
        return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = message.memberId === member.id;
    const isGroupOwner = member.role === MemberRole.OWNER;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isGroupOwner || isModerator;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "DELETE") {
      const delMessage = await db.message.delete({
        where: {
          id: messageId as string,
        },
      })
      const updateKey = `chat:${topicId}:messages:update`;

        res?.socket?.server?.io?.emit(updateKey, message);/////////////////////////////////////////////////////////////might have to chaange this

        return res.status(200).json(delMessage);
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      message = await db.message.update({
        where: {
          id: messageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true,
            }
          }
        }
      })
    }

    const updateKey = `chat:${topicId}:messages:update`;

    res?.socket?.server?.io?.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" });
  }
}