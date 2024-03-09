import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Group, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    groupId: string
) {
    try {
        const profile = await currentProfile();
        const { name } = await req.json();
        const { searchParams} = new URL(req.url);

        //const groupId = searchParams.get("groupId");
        const email = searchParams.get("name");
        if(!email){
            return new NextResponse("Email Missing", { status: 400 });
        }

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!groupId){
            return new NextResponse("Group ID Missing", { status: 400 });
        }
        const newMember = await db.profile.findFirst({
            where: {
                email: email
            }
        })
        if(!newMember){
            return new NextResponse("User Missing", { status: 400 });
        }

        const group = await db.group.update({
            where: {
                id: groupId,
            },
            data: {
                members: {
                    create: {
                        profileId: profile.id,
                        

                    }
                }
            }
        });

        return NextResponse.json(group);

        
    } catch(error) {
        console.log("TOPICS_ERROR", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}