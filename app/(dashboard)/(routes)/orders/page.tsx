import { format } from 'date-fns'
import prisma from '@/lib/prismadb'
import Container from '@/components/ui/container'
import { formatPrice } from '@/lib/utils'
import { Metadata } from 'next'
import OrdersClient from './components/client'
import { OrderColumn } from './components/columns'
import { getCurrentUser } from '@/actions/getCurrentUser'

export const metadata: Metadata = {
    title: 'DashBoard - Product',
}

const OrdersPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const orders = await prisma.order.findMany({
        include: {
            orderItems: {
                where: {
                    product: {
                        userId: currentUser.id
                    }
                },
                include: {
                    product: true,
                }
            }
        }
    })

    const formattedOrders: OrderColumn[] = orders.map((item) => ({
        id: item.id,
        purchaser: item.purchaser_name,
        products: item.orderItems
            .map((orderItem) => {
                return {
                    name: orderItem.product.name,
                    size: orderItem.size,
                    color: orderItem.color,
                    quantity: orderItem.quantity,
                }
            }),
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        totalPrice: formatPrice.format(item.orderItems
            .reduce((acc, item) => {
                return acc + Number(item.product.price) * item.quantity
            }, 0)),
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <OrdersClient data={formattedOrders} />
        </Container>
    )
}

export default OrdersPage;