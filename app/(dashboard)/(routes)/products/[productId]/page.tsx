import Container from "@/components/ui/container"
import prisma from "@/lib/prismadb"
import { ProductForm } from "./components/product-form"
import { getCurrentUser } from "@/actions/getCurrentUser"


const ProductPage = async ({
    params
}: { params: { productId: string } }) => {
    const currentUser = await getCurrentUser();
    const product = await prisma.product.findUnique({
        where: {
            id: params.productId
        },
        include: {
            images: true,
        }
    })

    const categories = await prisma.category.findMany()
    const sizes = await prisma.size.findMany()
    const colors = await prisma.color.findMany()

    return (
        <Container>
            <ProductForm
                initialValues={product}
                categories={categories}
                sizesList={sizes}
                colorsList={colors}
            />
        </Container>
    )
}

export default ProductPage