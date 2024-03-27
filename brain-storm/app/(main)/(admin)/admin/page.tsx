import Example from "@/components/admin/chart";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
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

    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    const twoWeek = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    const threeWeek = new Date(Date.now() - 21 * 24 * 60 * 60 * 1000);
    const fourWeek = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);

    const numGroups = await db.group.count();
    const numProfiles = await db.profile.count();
    const weekMessages = await db.message.count({
        where: {
            createdAt: {
                gte: lastWeek,
            }
        }
    });
    const dayMessages = await db.message.count({
        where: {
            createdAt: {
                gte: yesterday,
            }
        }
    });

    const week2 = await db.message.count({
        where: {
            createdAt: {
                gte: twoWeek,
                lte: lastWeek,
            }
        }
    });

    const week3 = await db.message.count({
        where: {
            createdAt: {
                gte: threeWeek,
                lte: twoWeek,
            }
        }
    });

    const week4 = await db.message.count({
        where: {
            createdAt: {
                gte: fourWeek,
                lte: threeWeek,
            }
        }
    });


    return ( 
        <div className="ml-4 mt-4">Admin page
            
            <br />
            <div>
                <ul>
                    <li>Total Groups: {numGroups}</li>
                    <li>Total Profiles: {numProfiles}</li>
                    <li>Messages Sent today: {dayMessages}</li>
                    <li>Messages Sent in last week: {weekMessages}</li>
                </ul>
            </div>
            <br />
            <a href="/admin/groups"><button className="bg-zinc-400 hover:bg-zinc-300 rounded-sm p-2">
                View Groups
            </button></a>

        </div>
     )
}
 
export default AdminPage;