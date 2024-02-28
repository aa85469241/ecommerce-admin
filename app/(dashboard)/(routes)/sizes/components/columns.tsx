"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-row-action"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"


export type SizeColumn = {
    id: string
    name: string
    value: string
    createAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        )
    },
    {
        accessorKey: "value",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Value" />
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
