"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-row-action"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"


export type ProductColumn = {
    id: string
    name: string
    price: string
    category: string
    sizes: string[]
    colors: string[]
    isFeatured: boolean
    createAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        )
    },
    {
        accessorKey: "isFeatured",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="isFeatured" />
        )
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        )
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        )
    },
    {
        accessorKey: "sizes",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Size" />
        ),
    },
    {
        accessorKey: "colors",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
        ),
        cell: ({ row }) => (
            <div className="flex gap-1">
                {row.original.colors.length === 0
                    ? <span>No result</span>
                    : row.original.colors.map((color, index) => (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full border-2"
                            style={{ backgroundColor: color }}
                        />
                    ))
                }
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
