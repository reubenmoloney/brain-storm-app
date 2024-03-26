import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { JoinButton } from "@/components/browse/join-button";
import { Group, Member, MemberRole } from "@prisma/client";
import { GroupWithMembersWithProfiles } from "@/types";
import { useRouter } from "next/router";
import { User } from "lucide-react";
import { redirect } from "next/navigation";



const browsePage = async () => {
    const profile = await currentProfile();

    //if theres no profile then send to sign-in page
    if(!profile) {
        return redirectToSignIn();
    }

    if(!profile.isAdmin){
        return redirect("/");
    }

    const groups = await db.group.findMany({
        include: {
            members: {
                include: {
                    profile: true
                }
            }
        }
    });
    //remove members array from group object
    const getGroup = (group: GroupWithMembersWithProfiles) => {
        const { members, ...newGroup} = group;
        return newGroup;
    }
    //redirect to selected group


    return ( 
        <>
        <div>
            <div className="text-xl m-5">
                All groups (including private groups)
                <a href="/admin"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2 ml-[200px]">
                    Back to Admin
                </button></a>
            </div> 
            <div className="">
            {groups.map((group) => (
                <div key={group.id} className="flex flex-inline m-2 p-2 bg-zinc-400 rounded-md">
                    <span className="text-1 text-white">{group.name}</span>: {group.description} <User className="ml-[40px]"/> {group.members.length} {group.isPublic && <span className="ml-2 text-green-500 bg-zinc-200 rounded-sm">Public</span>}{!group.isPublic && <span className="ml-2 text-rose-800 bg-zinc-200 rounded-sm">Private</span>}
                    {group.members.find((member) => member.profileId === profile.id) &&
                    <button 
                        className="bg-zinc-200 p-1 rounded-lg hover:bg-zinc-50 ml-auto"
                    >
                        Already Joined
                    </button>
                    }
                    {!group.members.find((member) => member.profileId === profile.id) &&
                        <JoinButton
                            group={getGroup(group)}
                            profile={profile}
                        />
                    }
                    DELETE BUTTON
                </div>
            ))}
            </div>
        </div>
        </>
     )
}
 
export default browsePage;