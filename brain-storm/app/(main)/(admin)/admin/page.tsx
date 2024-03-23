import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AdminPage = async() => {
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    if(!profile.isAdmin){
        return redirect("/");
    }

    return ( 
        <div>Admin page</div>
     )
}
 
export default AdminPage;