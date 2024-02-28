import { create } from "zustand"

interface useSignInModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSignInModal = create<useSignInModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))