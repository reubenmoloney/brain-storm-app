import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import axios from "axios";
import { redirect } from "next/navigation";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();

    /*
    if(!profile){
        try {
            await axios.patch(`/api/profile/${profile.id}`);//errror is here
        } catch(error) {
            console.log(error);
        }
    }
    */

    

    return ( 
        <div className="h-full">
        <div className="m-4">
            Welcome {profile.name}, this will be the homepage
            <br />
            Some hot and upcoming groups::
            <br />
            <a href="https://brainstorm-marketing-site.vercel.app/"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2">
                BrainStorm Company
            </button></a>
            {profile.isAdmin &&
            <a href="/admin"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2 ml-4">
                Admin Section
            </button></a>
            }
            {!profile.name &&
                <div>
                    NO NAME
                </div>
            }
            
        </div>
        </div>
     );
}
 
export default LandingPage;