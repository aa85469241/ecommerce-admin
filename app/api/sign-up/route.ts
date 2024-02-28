import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return new NextResponse("Missing name, email, or password.", { status: 400 });
    }

    const isExist = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (isExist) {
        return new NextResponse("User is already exist.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            role: "ADMIN",
        }
    })

    return NextResponse.json(user);
}