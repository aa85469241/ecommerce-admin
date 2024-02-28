import { format } from 'date-fns'
import prisma from '@/lib/prismadb'
import Container from '@/components/ui/container'
import ProductsClient from './components/client'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { ProductColumn } from './components/columns'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DashBoard - Product',
}

const ProductsPage = async () => {
    const currentUser = await getCurrentUser();
    const products = await prisma.product.findMany({
        where: {
            userId: currentUser?.id
        },
        include: {
            category: true,
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedProducts: ProductColumn[] = products.map((item) => ({
        id: item.id,
        name: item.name,
        price: formatPrice.format(item.price),
        category: item.category.name,
        sizes: item.sizes,
        colors: item.colors,
        isFeatured: item.isFeatured,
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <ProductsClient data={formattedProducts} />
        </Container>
    )
}

export default ProductsPage;