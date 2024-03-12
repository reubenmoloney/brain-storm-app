import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Group, MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
) {
    try {
        const { group, values } = await req.json();
        const { searchParams} = new URL(req.url);

        const email = values.email;

        const profile = await db.profile.findFirst({
            where: {
                email: email
            }
        });

        if(!profile){
            return alert("User not found");
        }

        console.log(profile.name);

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