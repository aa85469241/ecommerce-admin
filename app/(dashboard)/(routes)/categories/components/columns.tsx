"use client"

import Image from "next/image"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-row-action"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"


export type CategoryColumn = {
    id: string
    name: string
    imageUrl: string
    billboardLabel: string
    createAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        )
    },
    {
        accessorKey: "image",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Image" />
        ),
        cell: ({ row }) => (
            <div className="relative h-8 w-8 overflow-hidden">
                <Image
                    src={row.original.imageUrl}
                    alt={row.original.name}
                    fill
                    className="object-cover object-center"
                />
            </div>
        )
    },
    {
        accessorKey: "createAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction row={row.original} />
    }
]
