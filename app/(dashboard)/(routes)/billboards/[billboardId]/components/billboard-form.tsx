'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Billboard } from "@prisma/client"
import { Input } from "@/components/ui/input"
import ImageUploader from "@/components/image-uploader";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
    label: z.string().min(1),
    image: z.string().min(1, { message: "InValid image url..." }),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
    initialValues: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialValues
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const params = useParams();

    const headingTitle = initialValues ? 'Edit billboard' : 'Create billboard'
    const headingDescription = initialValues ? 'edit your billboard' : 'create a new billboard for your store'
    const toastMessage = initialValues ? 'Billboard updated.' : 'Billboard created.';
    const buttonLabel = initialValues ? 'save your changes' : 'create';

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            label: "",
            image: "",
        }
    })

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setIsLoading(true);
            if (initialValues) {
                await axios.patch(`/api/billboards/${params.billboardId}`, values)
            } else {
                await axios.post("/api/billboards", values)
            }
            router.refresh();
            router.push("/billboards");
            toast.success(toastMessage);
        }
        catch (err) {
            toast.error("Error occur!!");
        }
        finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/billboards/${params.categoryId}`);
            router.refresh();
            router.push(`/billboards`);
            toast.success('Billboard deleted.');
        } catch (error) {
            toast.error('Make sure you removed all products using this billboard first.');
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
                    size="sm"
                    variant="destructive"
                    disabled={params.billboardId === "new" ? true : false}
                    onClick={onDelete}
                >
                    <FiTrash size={20} className="mr-2" /> Delete
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Background Image:</FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        value={field.value ? [field.value] : []}
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Label:</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isLoading}
                                        className="max-w-sm border-2" {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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