import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";
import { OrderItem } from "@prisma/client";

export interface MonthlySalesProps {
    sales: number
    sales_revenue: number
}

export const getMonthlyOrders = async () => {
    const now = new Date();
    const headOfMonth = now.getFullYear() + "-" + (Number(now.getMonth()) + 1) + "-01"

    const currentUser = await getCurrentUser();
    const monthlyOrders = await prisma.order.findMany({
        where: {
            isPaid: true,
            createAt: {
                lte: now,
                gte: new Date(headOfMonth)
            }
        },
        include: {
            orderItems: {
                where: {
                    product: {
                        userId: currentUser?.id
                    }
                },
                include: {
                    product: true,
                }
            }
        }
    })

    return monthlyOrders;
}