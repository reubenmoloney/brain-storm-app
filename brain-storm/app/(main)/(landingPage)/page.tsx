import { initialProfile } from "@/lib/initial-profile";

const LandingPage = async () => {
    //get profile of user
    const profile = await initialProfile();

    

    return ( 
        <div className="h-full">
        <div className="m-4 text-center">
            Welcome to BrainStorm {profile.name}!
            <br />
            If your new and would like some help, please go to our <a href="/help" className="hover:underline text-rose-400 hover:text-rose-600">help section</a>.
            <br />
            To find a group thats right for you, check out all the established public groups in the <a href="/browse" className="hover:underline text-rose-400 hover:text-rose-600">browse section</a>.
            <br />
            To create your own group, or go to groups that you're already in, go to the <a href="/groups" className="hover:underline text-rose-400 hover:text-rose-600">my groups section</a>.
            <br />
            You can access all these sections at anytime via the navbar at the top of your screen, please enjoy our platform!.
            <br />
            <a href="https://brainstorm-marketing-site.vercel.app/"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2">
                BrainStorm Company
            </button></a>
            {profile.isAdmin &&
            <a href="/admin"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2 ml-4">
                Admin Section
            </button></a>
            }
        </div>
        </div>
     );
}
 
export default LandingPage;