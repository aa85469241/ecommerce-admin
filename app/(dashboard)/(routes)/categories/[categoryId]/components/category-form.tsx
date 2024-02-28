'use client';

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Billboard, Category } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageUploader from "@/components/image-uploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().min(1, { message: "InValid image url..." }),
    billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
    initialValues: Category | null,
    billboards: Billboard[],
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialValues,
    billboards,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const headingTitle = initialValues ? 'Edit category' : 'Create category'
    const headingDescription = initialValues ? 'edit your category' : 'create a new category for your store'
    const toastMessage = initialValues ? 'Category updated.' : 'Category created.';
    const buttonLabel = initialValues ? 'save your changes' : 'create';

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            name: "",
            imageUrl: "",
            billboardId: "",
        }
    })

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setIsLoading(true);
            if (initialValues) {
                await axios.patch(`/api/categories/${params.categoryId}`, values)
            } else {
                await axios.post("/api/categories", values)
            }
            router.refresh();
            router.push("/categories");
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
            await axios.delete(`/api/categories/${params.categoryId}`);
            router.refresh();
            router.push(`/categories`);
            toast.success('Category deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all products using this category first.');
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">Image:</FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid md:grid-cols-3 gap-4 md:gap-8 items-center">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">name:</FormLabel>
                                    <FormControl>
                                        <Input className="w-full max-w-sm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Billboard:</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full max-w-sm">
                                                <SelectValue
                                                    defaultValue={field.value}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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