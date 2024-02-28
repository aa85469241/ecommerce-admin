import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(
    request: Request
) {
    try {
        const user = await getCurrentUser();

        const body = await request.json();

        const { name, imageUrl, billboardId } = body;

        if (!user) {
            return new NextResponse("UnAuthorized", { status: 403 })
        }

        if (!name || !imageUrl || !billboardId) {
            return new NextResponse("Name, imageUrl and billboardId are required.", { status: 400 })
        }

        const category = await prisma.category.create({
            data: {
                name,
                imageUrl,
                billboardId,
                userId: user.id
            }
        })

        return NextResponse.json(category)
    } catch (err) {
        console.log("[CATEGORIES_POST]", err)
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const categories = await prisma.category.findMany({
            include: {
                billboard: true
            }
        })

        return NextResponse.json(categories);
    } catch (err) {
        console.log('[CATEGORIES_GET]', err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export const revalidate = 10;