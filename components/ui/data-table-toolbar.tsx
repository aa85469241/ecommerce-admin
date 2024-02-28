'use client';

import { Table } from "@tanstack/react-table";
import { Input } from "./input";
import { Button } from "./button";
import { FiXCircle } from "react-icons/fi";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchKey: string;
}

export function DataTableToolbar<TData>({
    table,
    searchKey
}: DataTableToolbarProps<TData>) {
    const isFiltering = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center py-4">
            <div className="w-fit relative">
                <Input
                    placeholder={`Filter ${searchKey}`}
                    value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn(searchKey)?.setFilterValue(event.target.value)
                    }
                    className="w-72"
                />
                {isFiltering &&
                    <Button
                        variant="outline"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-4/5 px-2 shadow-md"
                        onClick={() => table.resetColumnFilters()}
                    >
                        Reset
                        <FiXCircle className="ml-2 h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    )
}