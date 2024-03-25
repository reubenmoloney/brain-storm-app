"use client";

import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

interface CallButtonProps{
    groupId: String;
}
const CallButton = ({groupId}: CallButtonProps) => {
    const router = useRouter();

    return ( 
        <button onClick={() => {router.push(`/groups/${groupId}/call`)}} className="mb-[10px] bg-zinc-400 w-[150px] ml-[40px] rounded-sm hover:bg-slate-300">
            Call
        </button>
     );
}
 
export default CallButton;


