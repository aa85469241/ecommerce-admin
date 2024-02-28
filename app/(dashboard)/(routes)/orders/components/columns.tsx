"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"


export type OrderColumn = {
    id: string
    products: {
        name: string
        size: string
        color: string
        quantity: number
    }[]
    phone: string
    address: string
    isPaid: boolean
    totalPrice: string
    purchaser: string
    createAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Products" />
        ),
        cell: ({ row }) => (
            <div>
                {row.original.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-base">{product.name}</span>
                        <p className="text-xs text-neutral-500 space-x-[2px]">
                            <span>{product.size}</span>
                            <span>|</span>
                            <span>{product.color}</span>
                        </p>
                        <span className="text-base">x{product.quantity.toString()}</span>
                    </div>
                ))}
            </div>
        )
    },
    {
        accessorKey: "purchaser",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Purchaser" />
        )
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        )
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        )
    },
    {
        accessorKey: "isPaid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="isPaid" />
        ),
        cell: ({ row }) => (
            <div>
                {row.original.isPaid ? "paid" : "unpaid"}
            </div>
        )
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TotalPrice" />
        )
    },
    {
        accessorKey: "createAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
        )
    },
]
