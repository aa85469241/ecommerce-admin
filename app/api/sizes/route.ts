import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

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

        const sizes = await prisma.size.create({
            data: {
                name,
                value,
                userId: user.id
            }
        })

        return NextResponse.json(sizes)
    } catch (err) {
        console.log('[SIZES_POST]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const sizes = await prisma.size.findMany()

        return NextResponse.json(sizes)
    } catch (err) {
        console.log('[SIZES_GET]', err);
        return new NextResponse('Internet error', { status: 500 })
    }
}

export const revalidate = 10;