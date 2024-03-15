import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Group, Member, MemberRole } from "@prisma/client";
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

        const checkGroup = await db.group.findUnique({
            where: {
                id: group.id,
            },
            include: {
                members: true
            },
        });

        const exists = checkGroup?.members.find((member) => member.profileId === profile.id);
        console.log("Already in the group", exists);

        if(exists){
            return new NextResponse("Already in group", { status: 400 });
        }
        
        //check members in group
        //const exists = checkGroup?.members.find((member: Member) => member.profileId === profile.id);
        //if(exists){
            //this means members already in the group
            //console.log("Already in the group");
            //return new NextResponse("Member already in group", { status: 100 });
        //}

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