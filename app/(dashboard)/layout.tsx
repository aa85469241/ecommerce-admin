import { getCurrentUser } from "@/actions/getCurrentUser"
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";


export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect("/sign-in");
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}