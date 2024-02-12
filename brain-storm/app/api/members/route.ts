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
                id: "44fac64c-4840-4b6d-8aea-32212f629fa2",
            },
            data: {
                members: {
                    create: {
                        profileId: "0e8bb84b-051c-4d2c-82c4-585826d54951",
                        

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