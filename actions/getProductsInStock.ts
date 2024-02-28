import prisma from "@/lib/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getProductsInStock = async () => {
    const currentUser = await getCurrentUser();
    const productsInStock = await prisma.product.count({
        where: {
            userId: currentUser?.id
        }
    })

    return productsInStock;
}