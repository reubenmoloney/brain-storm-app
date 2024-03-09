import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { JoinButton } from "@/components/browse/join-button";



const browsePage = async () => {
    const profile = await currentProfile();

    //if theres no profile then send to sign-in page
    if(!profile) {
        return redirectToSignIn();
    }
    const groups = await db.group.findMany({
        where: {
            isPublic: true
        }
    })

    /*
    const onClick = async (groupId: string) =>{
        //need to check if user is in group before adding them -----------------
        /*
        const alreadyInGroup = await db.group.findFirst({
            where: {
                id: groupId,
                members:{
                    some: {
                        profileId: profile.id
                    }
                }
            }
        })

        if(alreadyInGroup){
            return null;
        }

        
        const updatedGroup = await db.group.update({
            where: {
                id: groupId,
            },
            data: {
                members:{
                    create:[
                        {
                            profileId: profile.id
                        }
                    ]
                }
            }
        })
        
        //send to that group
        return redirect(`/groups/${updatedGroup.id}`);
    }*/
    return ( 
        <>
        <div>
            <div className="text-xl m-5">All of these groups are public and you can join them now!</div>
            <div className="">
            {groups.map((group) => (
                <div key={group.id} className="flex flex-inline m-2 p-2 bg-zinc-400 rounded-md">{group.name}
                    <JoinButton
                        group={group}
                        profile={profile}
                    />
                </div>
            ))}
            </div>
        </div>
        </>
     )
}
 
export default browsePage;