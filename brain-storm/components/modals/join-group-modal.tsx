"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const JoinGroupModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "joinGroup";
    const { group, profile } = data;//this aint working

    if(!group){
        return(console.log("no group in join group modal"))
    }
    if(!profile){
        return(console.log("no profile in join group modal"))
    }

    const values = {
        profile,
        group
    }

    const onSubmit = async () => {
        try{
            await axios.post("/api/members", values);
            router.refresh();
            onClose();
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Join <span className="font-semibold text-indigo-500">{group?.name}</span>?
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={onSubmit}
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>    
            </DialogContent>
        </Dialog>
    )
}