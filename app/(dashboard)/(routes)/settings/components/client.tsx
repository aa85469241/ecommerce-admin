'use client';
import { User } from '@prisma/client'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import UserStatus from './user-status';

import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { updateUsername } from '@/actions/update-username';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { dateFormat } from '@/lib/utils';
import { FiCheck } from 'react-icons/fi';

export const SettingsSchema = z.object({
    name: z.string().min(1, { message: 'At least 1 letter required' }),
})

interface SettingsClientProps {
    user: User;
}

const SettingsClient: React.FC<SettingsClientProps> = ({
    user
}) => {
    const [isPending, startTransition] = useTransition();
    const { update } = useSession();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user.name,
        }
    })

    const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            updateUsername(values)
                .then(() => {
                    toast.success('Updated Success!!')
                    update();
                })
        })
    }

    return (
        <>
            <Heading
                title='Settings'
                description='Update your account settings.'
            />
            <Separator />
            <UserStatus user={user} />
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 max-w-2xl"
                >
                    <div className="flex items-end">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Name:
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-w-xs"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="ml-2"
                        >
                            change
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="flex items-center gap-2">
                <h1>Update At:</h1>
                <p className="text-neutral-500">
                    {dateFormat(user.updateAt)}
                </p>
            </div>
        </>
    )
}

export default SettingsClient