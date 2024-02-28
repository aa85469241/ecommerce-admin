"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-row-action"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"


export type ColorColumn = {
    id: string
    name: string
    value: string
    createAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
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
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <span
                    className="w-6 h-6 rounded-sm border-2"
                    style={{ backgroundColor: row.original.value }}
                />
                {row.original.value}
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
