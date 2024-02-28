import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { name, price, isFeatured, categoryId, sizes, colors, images } = body;

        if (!user) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        if (!name || !price || !isFeatured || !categoryId) {
            return new NextResponse('Name, price, categoryId, isFeatured are required.', { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse('Images are required.', { status: 400 });
        }


        const products = await prisma.product.create({
            data: {
                name,
                price,
                categoryId,
                isFeatured,
                sizes,
                colors,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
                userId: user.id,
            }
        })

        return NextResponse.json(products)
    } catch (err) {
        console.log('[PRODUCTS_POST]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("categoryId") || undefined;
        const isFeatured = searchParams.get('isFeatured');
        const colors = searchParams.getAll("colors");
        const sizes = searchParams.getAll("sizes");

        const products = await prisma.product.findMany({
            where: {
                categoryId,
                isFeatured: isFeatured ? true : undefined,
                sizes: sizes.length === 0 ? undefined : { hasSome: sizes },
                colors: colors.length === 0 ? undefined : { hasSome: colors }
            },
            include: {
                user: true,
                images: true,
                category: true,
            },
            orderBy: {
                createAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch (err) {
        console.log('[PRODUCTS_GET]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export const revalidate = 10;