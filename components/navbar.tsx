
import { getCurrentUser } from "@/actions/getCurrentUser"
import UserMenu from "./user-menu";
import NavList from "./nav-list";
import Link from "next/link";


const Navbar = async () => {
    const currentUser = await getCurrentUser();

    return (
        <div className="h-16 flex items-center justify-between border-b p-4 md:px-8">
            <div className="flex">
                <Link href="/">
                    <div className="relative group mr-4 md:mr-6">
                        <h1 className="
                        text-2xl 
                        uppercase 
                        font-extrabold
                        "
                        >
                            Seller
                        </h1>
                        <span className="
                        absolute 
                        bottom-0 
                        right-0
                        translate-y-2
                        text-sm 
                        font-light 
                        tracking-wider
                        opacity-70
                        "
                        >
                            center
                        </span>
                    </div>
                </Link>
                <NavList />
            </div>
            <UserMenu currentUser={currentUser} />
        </div>
    )
}

export default Navbar