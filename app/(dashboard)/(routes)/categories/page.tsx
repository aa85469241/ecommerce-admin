import { Metadata } from "next";
import prisma from "@/lib/prismadb"
import { format } from "date-fns";
import { getCurrentUser } from "@/actions/getCurrentUser"
import Container from "@/components/ui/container"
import CategoriesClient from "./components/client";
import { CategoryColumn } from "./components/columns";

export const metadata: Metadata = {
    title: 'DashBoard - Category',
}

const CategoriesPage = async () => {
    const currentUser = await getCurrentUser();
    const categories = await prisma.category.findMany({
        where: {
            userId: currentUser?.id
        },
        include: {
            billboard: true
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        billboardLabel: item.billboard.label,
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <CategoriesClient data={formattedCategories} />
        </Container>
    )
}

export default CategoriesPage