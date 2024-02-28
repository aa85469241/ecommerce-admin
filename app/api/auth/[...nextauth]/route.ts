import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: "GoogleAuth-" + profile.email,
                    image: profile.picture,
                    role: profile.role ?? UserRole.ADMIN
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email,
                    }
                })

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                )

                if (!isPasswordCorrect) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    callbacks: {
        session({ session, token }) {
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            return session
        },
        jwt({ token, user }) {
            return { ...token, ...user }
        },
    },
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };