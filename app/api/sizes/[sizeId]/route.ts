import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    params: { sizeId: string }
) {
    try {
        if (!params.sizeId) {
            return new NextResponse('There is no sizeId existed.', { status: 400 })
        }

        const size = await prisma.size.findUnique({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_GET]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { name, value } = body;

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!name || !value || !params.sizeId) {
            return new NextResponse('Name, value and sizeId are required.', { status: 400 });
        }

        const size = await prisma.size.update({
            where: {
                id: params.sizeId
            },
            data: { name, value }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_PATCH]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!params.sizeId) {
            return new NextResponse('There is no sizeId existed.', { status: 400 })
        }

        const size = await prisma.size.delete({
            where: {
                id: params.sizeId
            }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_DELETE]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export const revalidate = 10;