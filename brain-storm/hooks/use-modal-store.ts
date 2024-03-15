import { Topic, Group, Profile, Member } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createGroup" | "removeMember" | "createTopic" | "leaveGroup" | "deleteGroup" | "deleteTopic" | "editGroup" | "invite" | "members" | "messageFile" | "deleteMessage" | "addMember" | "joinGroup";

interface ModalData {
    group?: Group;
    profile?: Profile;
    topic? : Topic;
    apiUrl?: string;
    query?: Record<string, any>;
    member?: Member;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false})
}));
