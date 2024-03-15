"use client";

import { UserButton } from "@clerk/nextjs";
import { Book, HelpCircle, Search } from "lucide-react";

//This is the bar at the top of the page that allows users to navigate through the different sections of the website and access their account
export const MobileNavBar = () => {
    
    return (
        <div className="flex flex-direction:row justify-center py-3 space-x-10 bg-rose-200 fixed w-full z-100">
            <a href="/groups" className="flex flex-direction:row hover:bg-rose-100 transition rounded-md"><Book/>Groups</a>
            <a href="/help" className="flex flex-direction:row hover:bg-rose-100 rounded-md transition"><HelpCircle /></a>
            <a href="/browse" className="flex flex-direction:row hover:bg-rose-100 rounded-md transition"><Search /></a>
            <UserButton 
                afterSignOutUrl="/"
            />
        </div>
    )
}