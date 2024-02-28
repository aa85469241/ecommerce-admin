import Container from "@/components/ui/container"
import prisma from "@/lib/prismadb"
import { CategoryForm } from "./components/category-form"


const CategoryPage = async ({
    params
}: { params: { categoryId: string } }) => {
    const category = await prisma.category.findUnique({
        where: {
            id: params.categoryId
        },
    })

    const billboards = await prisma.billboard.findMany()

    return (
        <Container>
            <CategoryForm initialValues={category} billboards={billboards} />
        </Container>
    )
}

export default CategoryPage