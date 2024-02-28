import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button"

interface AlertModalProps {
    removedItem: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
    removedItem,
    isOpen,
    onClose,
    onDelete,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Are you sure ?"
            description={`Are you sure you want to delete "${removedItem}". This process cannot be undone!`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex items-center justify-end gap-4 pr-4">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    variant="destructive"
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default AlertModal