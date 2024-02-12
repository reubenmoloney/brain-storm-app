import { db } from "@/lib/db";

const browsePage = async () => {
    const groups = await db.group.findMany({
        where: {
            isPublic: true
        }
    })
    return ( 
        <div>
            <div className="text-xl m-5">All of these groups are public and you can join them now!</div>
            <div className="">
            {groups.map((group) => (
                <div className="flex flex-inline m-2 p-2 bg-zinc-400 rounded-md">{group.name} <button className="bg-zinc-200 p-1 rounded-lg hover:bg-zinc-50 ml-auto">Join</button></div>
            ))}
            </div>
        </div>
     )
}
 
export default browsePage;