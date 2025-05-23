"use client";

import { CreateGroupModal } from "../modals/create-group-modal";
import { useEffect, useState } from "react";
import { CreateTopicModal } from "../modals/create-topic-modal";
import { DeleteTopicModal } from "../modals/delete-topic-modal";
import { DeleteGroupModal } from "../modals/delete-group-modal";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message-modal";
import { EditGroupModal } from "../modals/edit-group-modal";
import { AddMemberModal } from "../modals/add-member-modal";
import { JoinGroupModal } from "../modals/join-group-modal";
import { LeaveGroupModal } from "../modals/leave-group-modal";
import { MembersModal } from "../modals/members-modal";
import { RemoveMemberModal } from "../modals/remove-member-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
    
    return(
        <>
            <CreateGroupModal />
            <CreateTopicModal />
            <DeleteTopicModal />
            <DeleteGroupModal />
            <MessageFileModal />
            <DeleteMessageModal />
            <EditGroupModal />
            <AddMemberModal />
            <JoinGroupModal />
            <LeaveGroupModal />
            <MembersModal />
            <RemoveMemberModal />
        </>
    )
}