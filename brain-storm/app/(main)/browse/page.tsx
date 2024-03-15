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
        },
        include: {
            members: true
        }
    })

    return ( 
        <>
        <div>
            <div className="text-xl m-5">All of these groups are public and you can join them now!</div>
            <div className="">
            {groups.map((group) => (
                <div key={group.id} className="flex flex-inline m-2 p-2 bg-zinc-400 rounded-md">
                    <span className="text-1 text-white">{group.name}</span>: {group.description}
                    {group.members.find((member) => member.profileId === profile.id) &&
                        <button 
                        className="bg-zinc-200 p-1 rounded-lg hover:bg-zinc-50 ml-auto"
                    >
                        Already Joined
                    </button>
                    }
                    {!group.members.find((member) => member.profileId === profile.id) &&
                        <JoinButton
                            group={group}
                            profile={profile}
                        />
                    }   
                </div>
            ))}
            </div>
        </div>
        </>
     )
}
 
export default browsePage;