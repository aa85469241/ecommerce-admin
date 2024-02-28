import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { label, image } = body;

        if (!user) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        if (!label || !image) {
            return new NextResponse('Both label and image are required.', { status: 400 });
        }

        const billboards = await prisma.billboard.create({
            data: {
                label,
                image,
                userId: user.id,
            }
        })

        return NextResponse.json(billboards)
    } catch (err) {
        console.log('[BILLBOARDS_POST]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const billboards = await prisma.billboard.findMany()

        return NextResponse.json(billboards)
    } catch (err) {
        console.log('[BILLBOARDS_GET]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export const revalidate = 10;