'use client';

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).max(9).regex(/^#(?:[0-9A-Z])/, {
        message: "String must be a valid hex code."
    })
})

type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialValues: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({
    initialValues
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const headingTitle = initialValues ? 'Edit color' : 'Create color'
    const headingDescription = initialValues ? 'edit your color' : 'create a new color for your store'
    const toastMessage = initialValues ? 'Color updated.' : 'Color created.';
    const buttonLabel = initialValues ? 'save your changes' : 'create';

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            value: "",
        }
    })

    const onSubmit = async (values: ColorFormValues) => {
        try {
            setIsLoading(true);
            if (initialValues) {
                await axios.patch(`/api/colors/${params.colorId}`, values)
            } else {
                await axios.post("/api/colors", values)
            }
            router.refresh();
            router.push("/colors");
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Error occur!!");
        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/colors/${params.colorId}`);
            router.refresh();
            router.push(`/colors`);
            toast.success('Color deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all products using this colors first.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={headingTitle}
                    description={headingDescription}
                />
                <Button
                    disabled={isLoading}
                    size="sm"
                    variant="destructive"
                    onClick={onDelete}
                >
                    <FiTrash size={20} className="mr-2" /> Delete
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-2xl"
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-w-xs"
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">value:</FormLabel>
                                    <FormControl>
                                        <div className="relative flex items-center w-fit">
                                            <Input
                                                className="max-w-xs"
                                                placeholder="Color value"
                                                {...field}
                                            />
                                            <span
                                                className={`
                                                absolute 
                                                right-2 
                                                w-6 
                                                h-6 
                                                rounded-sm 
                                                ${field.value ? "border-2" : "border-0"}
                                                `}
                                                style={{
                                                    backgroundColor: field.value
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-x-4">
                        <Button
                            disabled={isLoading}
                            size="sm"
                            type="submit"
                        >
                            {buttonLabel}
                        </Button>
                        <Button
                            disabled={isLoading}
                            size="sm"
                            variant="outline"
                            type="button"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}