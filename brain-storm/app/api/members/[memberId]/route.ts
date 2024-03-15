import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const groupId = searchParams.get("groupId");
        
        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });//status is depriciated
        }

        if(!groupId){
            return new NextResponse("group ID Missing", { status: 400 });
        }
        
        if (!params.memberId) {
            return new NextResponse("MEmeber ID Missing", { status: 400 });
        }

        const group = await db.group.update({
            where: {
                id: groupId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(group);

    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });//status is depreciated
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        
        const { searchParams } = new URL(req.url);
        const groupId = searchParams.get("groupId");

        if(!groupId){
            return new NextResponse("GROUP NOT FOUND", { status: 404})
        }

        const group = await db.group.update({
            where: {
                id: groupId,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        role: {
                            not: MemberRole.OWNER
                        }
                    },
                    
                }
            }
        });

        return NextResponse.json(group);

    } catch (error) {
        console.log("[group_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });//status is depriciated
    }
}