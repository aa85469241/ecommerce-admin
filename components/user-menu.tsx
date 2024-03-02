"use client";

import Image from "next/image";
import ProfilePlaceholder from "@/public/images/profile-placeholder.svg"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react";
import { FiLogOut, FiUser, FiSettings } from "react-icons/fi"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu"
import Link from "next/link";

interface UserMenuProps {
    currentUser: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="
                    flex 
                    items-center 
                    gap-2
                    border
                    border-slate-400/60
                    rounded-full
                    shadow-md
                    p-1
                    transition
                    focus:ring-0
                    focus:outline-0
                    hover:bg-neutral-200
                    md:rounded-3xl
                    md:px-2
                    "
                >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                            src={currentUser?.image || ProfilePlaceholder} alt="profile-image"
                            width={50}
                            height={50}
                        />
                    </div>
                    <span className="hidden md:inline-block">{currentUser?.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link href="/settings" className="w-full flex items-center">
                                <FiSettings className="mr-2" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/sign-in" })}
                    >
                        <FiLogOut className="mr-2" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu