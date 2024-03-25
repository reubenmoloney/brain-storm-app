import Editor from "@/components/editor/editor";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();
    

    return ( 
        <div className="w-full h-full">
            Welcome {profile.name}, this will be the homepage
            <br />
            Some hot and upcoming groups::
            <br />
            {profile.isAdmin &&
            <a href="/admin"><div className="bg-zinc-400 hover:bg-zinc-300 w-[80px] rounded-[12px] p-1">ADMIN BUTTON</div>
            </a>
            }
            <Editor />
        </div>
     );
}
 
export default LandingPage;