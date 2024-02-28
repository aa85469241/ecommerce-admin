import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        if (!params.categoryId) {
            return new NextResponse('There is no categoryId existed', { status: 400 })
        }

        const category = await prisma.category.findUnique({
            where: {
                id: params.categoryId
            },
            include: {
                billboard: true
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log("[CATEGORY_GET]", err);
        return new NextResponse("Internet error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();

        const { name, imageUrl, billboardId } = body;

        if (!user) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }

        if (!name || !imageUrl || !billboardId || !params.categoryId) {
            return new NextResponse("Name, imageUrl, billboardId and categoryId are required", { status: 400 });
        }

        const category = await prisma.category.update({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                imageUrl,
                billboardId,
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log("[CATEGORY_PATCH]", err);
        return new NextResponse("Internet error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse("UnAuthorized", { status: 401 });
        }

        if (!params.categoryId) {
            return new NextResponse("CategoryId is required", { status: 400 });
        }

        const category = await prisma.category.delete({
            where: {
                id: params.categoryId
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log("[CATEGORY_DELETE]", err);
        return new NextResponse("Internet error", { status: 500 });
    }
}

export const revalidate = 10;