'use client';

import Image from "next/image";
import { Order, OrderItem, Prisma } from "@prisma/client";
import { Avatar } from "./ui/avatar";
import UserIcon from "@/public/images/user.png"
import { formatPrice } from "@/lib/utils";

type OrderWithOrderItem = Prisma.OrderGetPayload<{
    include: {
        orderItems: {
            include: {
                product: true
            }
        }
    }
}>

const RecentSales = ({ data }: { data: OrderWithOrderItem[] }) => {

    return (
        <div className="space-y-4">
            {data.map((item) => {
                const totalRevenue = item.orderItems.reduce((total, _item) => {
                    return total + _item.quantity * _item.product.price
                }, 0)

                if (item.orderItems.length) {
                    return (
                        <div key={item.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <Image src={UserIcon} alt="Avatar" />
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {item.purchaser_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {item.purchaser_email}
                                </p>
                            </div>
                            <div className="ml-auto font-medium">
                                +{formatPrice.format(totalRevenue)}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default RecentSales