import prisma from "@/lib/prismadb"
import { getCurrentUser } from "./getCurrentUser"


export const getSales = async () => {
    const currentUser = await getCurrentUser();
    const orderIsPaid = await prisma.order.findMany({
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
                select: {
                    quantity: true
                }
            }
        }
    })

    const orderItems = orderIsPaid.flatMap(order => order.orderItems)

    const salesTotal = orderItems.reduce((sum, item) => {
        return sum + item.quantity
    }, 0)

    return salesTotal;
}

