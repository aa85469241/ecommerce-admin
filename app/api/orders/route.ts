import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(req: Request) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                isPaid: true
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    }
                }
            },
            orderBy: {
                createAt: 'desc'
            }
        })

        return NextResponse.json(orders)
    }
    catch (err) {
        console.log('[ORDERS_GET]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export const revalidate = 10;