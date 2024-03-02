'use server'

import { SettingsSchema } from '@/app/(dashboard)/(routes)/settings/components/client';
import * as z from 'zod';
import { getCurrentUser } from './getCurrentUser';
import prisma from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';

export const updateUsername = async (
    values: z.infer<typeof SettingsSchema>
) => {
    const user = await getCurrentUser();

    if (!user) return { error: "UnAuthorized!!" }

    await prisma.user.update({
        where: { id: user.id },
        data: { ...values }
    })

    revalidatePath("/settings")

    return { success: "Updated Success!!" }
}