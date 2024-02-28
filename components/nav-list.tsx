"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

interface NavListProps {
    className?: string;
}

const NavList: React.FC<NavListProps> = ({
    className,
}) => {
    const pathname = usePathname();

    const routes = [
        {
            href: "/billboards",
            label: "Billboards",
            active: pathname === "/billboards",
        },
        {
            href: "/categories",
            label: "Categories",
            active: pathname === "/categories",
        },
        {
            href: "/sizes",
            label: "Sizes",
            active: pathname === "/sizes",
        },
        {
            href: "/colors",
            label: "Colors",
            active: pathname === "/colors",
        },
        {
            href: "/products",
            label: "Products",
            active: pathname === "/products",
        },
        {
            href: "/orders",
            label: "Orders",
            active: pathname === "/orders",
        },
    ]

    return (
        <>
            <nav className={cn("hidden md:flex md:items-center md:space-x-6", className)}>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-light hover:text-black", route.active ? "text-black" : "text-muted-foreground")}
                    >
                        {route.label}
                    </Link>
                ))}
            </nav>
            <div className="md:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2">
                            <AiOutlineMenuUnfold size={20} />
                            Routes
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {routes.map((route) => (
                            <DropdownMenuItem key={route.href}>
                                <Link
                                    href={route.href}
                                    className={cn("text-sm font-light hover:text-black", route.active ? "text-black" : "text-muted-foreground")}
                                >
                                    {route.label}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export default NavList