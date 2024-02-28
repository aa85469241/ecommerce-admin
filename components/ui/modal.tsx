import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog"

interface ModalProps {
    title: string;
    description: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    children,
    isOpen,
    onClose,
}) => {
    const handleOpenChange = () => {
        if (!isOpen) {
            onClose();
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleOpenChange}
        >
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-medium tracking-wide">
                        <FiAlertCircle size={30}/>
                        {title}
                    </DialogTitle>
                    <DialogDescription className="tracking-wide text-start">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>

    )
}