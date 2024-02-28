import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        if (!params.productId) {
            return new NextResponse('There is no productId existed.', { status: 400 })
        }

        const product = await prisma.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                category: true,
                images: true,
            }
        })

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_GET]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { name, price, categoryId, sizes, colors, images, isFeatured } = body;

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!name || !price || !isFeatured || !categoryId || !params.productId) {
            return new NextResponse('Name, price, categoryId, sizeId, colorId and productId, isFeatured are required.', { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse('Images are required.', { status: 400 });
        }

        await prisma.product.update({
            where: {
                id: params.productId
            },
            data: {
                name,
                price,
                isFeatured,
                categoryId,
                colors,
                sizes,
                images: {
                    deleteMany: {}
                }
            }
        })

        const product = await prisma.product.update({
            where: {
                id: params.productId
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_PATCH]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { productId: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!params.productId) {
            return new NextResponse('There is no productId existed.', { status: 400 })
        }

        const product = await prisma.product.delete({
            where: {
                id: params.productId
            }
        })

        return NextResponse.json(product);
    } catch (err) {
        console.log('[PRODUCT_DELETE]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export const revalidate = 10;