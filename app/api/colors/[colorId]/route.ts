import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        if (!params.colorId) {
            return new NextResponse('There is no colorId existed.', { status: 400 })
        }

        const color = await prisma.color.findUnique({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_GET]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { name, value } = body;

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!name || !value || !params.colorId) {
            return new NextResponse('Name, value and colorId are required.', { status: 400 });
        }

        const color = await prisma.color.update({
            where: {
                id: params.colorId
            },
            data: { name, value }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_PATCH]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!params.colorId) {
            return new NextResponse('There is no colorId existed.', { status: 400 })
        }

        const color = await prisma.color.delete({
            where: {
                id: params.colorId
            }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_DELETE]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export const revalidate = 10;