'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineCopy, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BillboardColumn } from "./columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AlertModal from "@/components/modals/AlertModal";

interface CellActionProps {
    row: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
    row
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Successfully copied!")
    }

    const onDelete = async () => {
        try {
            await axios.delete(`/api/billboards/${row.id}`);
            toast.success(`${row.label} has been deleted.`);
            router.refresh();
        } catch (err) {
            toast.error("Make sure you removed all products using this category first.")
        } finally {
            setOpen(false);
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="
                        flex 
                        h-8 
                        w-8 
                        p-0
                        rounded-full
                        data-[state=open]:bg-gray-200 
                        hover:bg-gray-200
                        "
                    >
                        <HiOutlineDotsHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="px-2">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(row.id)}
                    >
                        <AiOutlineCopy
                            className="mr-2"
                            size={20}
                        />
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => router.push(`/billboards/${row.id}`)}
                    >
                        <AiOutlineEdit className="mr-2" size={20} />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        <AiOutlineDelete className="mr-2" size={20} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
            <AlertModal
                removedItem={row.label}
                isOpen={open}
                onClose={() => setOpen(false)}
                onDelete={onDelete}
            />
        </>
    )
}