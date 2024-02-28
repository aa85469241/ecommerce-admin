import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return new NextResponse('There is no billboardId existed.', { status: 400 })
        }

        const billboard = await prisma.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_GET]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { label, image } = body;

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!label || !image || !params.billboardId) {
            return new NextResponse('Label, image and billboardId are required.', { status: 400 });
        }

        const billboard = await prisma.billboard.update({
            where: {
                id: params.billboardId
            },
            data: {
                label,
                image
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_PATCH]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return new NextResponse('UnAuthorized', { status: 403 });
        }

        if (!params.billboardId) {
            return new NextResponse('There is no billboardId existed.', { status: 400 })
        }

        const billboard = await prisma.billboard.delete({
            where: {
                id: params.billboardId
            }
        })

        return NextResponse.json(billboard);
    } catch (err) {
        console.log('[BILLBOARD_DELETE]', err);
        return new NextResponse('Internet Error', { status: 500 });
    }
}

export const revalidate = 10;