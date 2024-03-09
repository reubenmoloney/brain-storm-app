import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Group, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { group, profile } = await req.json();
        const { searchParams} = new URL(req.url);

        console.log(group, profile);
        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!group){
            return new NextResponse("Group ID Missing", { status: 400 });
        }

        const newGroup = await db.group.update({
            where: {
                id: group.id,
            },
            data: {
                members: {
                    create: {
                        profileId: profile.id,
                    }
                }
            }
        });

        return NextResponse.json(newGroup);

        
    } catch(error) {
        console.log("TOPICS_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}