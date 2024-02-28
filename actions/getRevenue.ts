import prisma from "@/lib/prismadb"
import { getCurrentUser } from "./getCurrentUser"


export const getRevenue = async () => {
    const currentUser = await getCurrentUser();
    const ordersIsPaid = await prisma.order.findMany({
        where: {
            isPaid: true,
        },
        include: {
            orderItems: {
                where: {
                    product: {
                        userId: currentUser?.id
                    }
                },
                include: {
                    product: true
                }
            }
        }
    })

    const totalRevenue = ordersIsPaid.reduce((total, order) => {
        const orderTotal = order.orderItems.reduce((sum, item) => {
            return sum + item.product.price * item.quantity
        }, 0)

        return total + orderTotal
    }, 0)

    return totalRevenue;
}