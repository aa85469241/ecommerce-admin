import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { name, value } = body;

        if (!user) {
            return new NextResponse('Unauthorized', { status: 403 });
        }

        if (!name || !value) {
            return new NextResponse('Both Name and value are required.', { status: 400 });
        }

        const colors = await prisma.color.create({
            data: {
                name,
                value,
                userId: user.id
            }
        })

        return NextResponse.json(colors)
    } catch (err) {
        console.log('[COLORS_POST]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const colors = await prisma.color.findMany()

        return NextResponse.json(colors)
    } catch (err) {
        console.log('[COLORS_GET]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export const revalidate = 10;