import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try{
        const { name, description, isPublicString } = await req.json();
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let isPublic = false;
        if(isPublicString === "true"){
            isPublic = true;
        }

        const group = await db.group.create({
            data: {
                profileId: profile.id,
                name: name,
                isPublic: isPublic,
                description: description,
                topics: {
                    create: [
                        { name: "general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.OWNER }
                    ]
                }
            }
        });

        return NextResponse.json(group);
    } catch(error){
        return new NextResponse("Internal Error", { status: 500});
    }
}