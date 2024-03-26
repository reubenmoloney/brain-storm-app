import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();

    

    return ( 
        <div className="w-full h-full m-4">
            Welcome {profile.name}, this will be the homepage
            <br />
            Some hot and upcoming groups::
            <br />
            {profile.isAdmin &&
            <a href="/admin"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2">
                Admin Section
            </button></a>
            }
        </div>
     );
}
 
export default LandingPage;