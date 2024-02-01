import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface GroupPageProps {
    params: {
        groupId: string;
    }
};

const groupPage = async ({
    params
}: GroupPageProps) => {

    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const group = await db.group.findUnique({
        where: {
            id: params.groupId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            topics: {
                where: {
                    name: "general"
                },
                orderBy: {
                    name: "asc"
                }
            }
        }
    })

    const initialTopic = group?.topics[0];

    if(initialTopic?.name !== "general"){
        return null;
    }
    return redirect(`/groups/${params.groupId}/topics/${initialTopic?.id}`);
}
 
export default groupPage;