import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
) {
    try {
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unautorized", { status: 401 });
        }

        if(profile.name !== null){
            return new NextResponse("Unautorized", { status: 401 });
        }

        const newName = profile.email;

        const newProfile = await db.profile.update({
            where: {
                id: profile.id,
            },
            data: {
                name: newName
            }
        });

        return NextResponse.json(newProfile);

    } catch (error) {
        console.log("[profile_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });//status is depriciated
    }
}