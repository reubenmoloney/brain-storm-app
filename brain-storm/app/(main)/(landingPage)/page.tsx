import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();

    

    return ( 
        <div className="h-full">
        <div className="m-4">
            Welcome {profile.name}, this will be the homepage
            <br />
            Some hot and upcoming groups::
            <br />
            <a href="/admin"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2">
                BrainStorm Company
            </button></a>
            {profile.isAdmin &&
            <a href="/"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2 ml-4">
                Admin Section
            </button></a>
            }
            
        </div>
        </div>
     );
}
 
export default LandingPage;