import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export interface GraphDataProps {
    name: string;
    total: number;
}

export const getGraphData = async () => {
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

    const monthlyRevenue: { [key: number]: number } = {};

    for (const order of ordersIsPaid) {
        const month = order.createAt.getMonth();
        let revenueForOrder = 0;

        for (const item of order.orderItems) {
            revenueForOrder += (item.product.price * item.quantity);
        }

        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder
    }

    const graphData: GraphDataProps[] = [
        { name: 'Jan', total: 0 },
        { name: 'Fab', total: 0 },
        { name: 'Mar', total: 0 },
        { name: 'Apr', total: 0 },
        { name: 'May', total: 0 },
        { name: 'Jun', total: 0 },
        { name: 'Jul', total: 0 },
        { name: 'Aug', total: 0 },
        { name: 'Sep', total: 0 },
        { name: 'Oct', total: 0 },
        { name: 'Nov', total: 0 },
        { name: 'Dec', total: 0 },
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
    }

    return graphData;
}