'use client';

import axios from "axios";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form"
import { FiTrash } from "react-icons/fi";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Color, Image, Product, Size } from "@prisma/client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/image-uploader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import MultiSelect from "@/components/ui/multi-select";

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    sizes: z.string().array(),
    colors: z.string().array(),
    isFeatured: z.boolean(),
    images: z.object({ url: z.string() }).array(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialValues: Product & {
        images: Image[]
    } | null
    categories: Category[]
    sizesList: Size[]
    colorsList: Color[]
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialValues,
    categories,
    sizesList,
    colorsList,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const headingTitle = initialValues ? 'Edit product' : 'Add new product'
    const headingDescription = initialValues ? 'edit your product' : 'Add a new product for your store'
    const toastMessage = initialValues ? 'Product updated.' : 'Product Added.';
    const buttonLabel = initialValues ? 'save your changes' : 'create';

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues ? {
            ...initialValues,
            price: parseFloat(String(initialValues?.price))
        }
            :
            {
                name: "",
                price: 0,
                categoryId: "",
                isFeatured: false,
                sizes: [],
                colors: [],
                images: [],
            }
    })

    const onSubmit = async (values: ProductFormValues) => {
        try {
            setIsLoading(true);
            if (initialValues) {
                await axios.patch(`/api/products/${params.productId}`, values)
            } else {
                await axios.post("/api/products", values)
            }
            router.refresh();
            router.push("/products");
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
            await axios.delete(`/api/products/${params.productId}`);
            router.refresh();
            router.push(`/products`);
            toast.success('Product deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all products using this products first.');
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
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base">
                                    Product Images:
                                </FormLabel>
                                <FormControl>
                                    <ImageUploader
                                        value={field.value.map((image) => image.url)}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-full max-w-sm"
                                            placeholder="Product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Price:</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="w-full max-w-sm"
                                            placeholder="Product price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">Category:</FormLabel>
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
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sizes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Size:
                                    </FormLabel>
                                    <div>
                                        <MultiSelect
                                            title="Choose size"
                                            options={sizesList}
                                            onChange={field.onChange}
                                            selected={field.value}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">
                                        Color:
                                    </FormLabel>
                                    <div>
                                        <MultiSelect
                                            title="Choose color"
                                            options={colorsList}
                                            onChange={field.onChange}
                                            selected={field.value}
                                        />
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="w-full max-w-sm flex flex-row items-start space-x-3 space-y-0 rounded-md border-2 border-black/40 mt-2 p-4">
                                    <FormControl>
                                        <Checkbox
                                            className="w-5 h-5"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-base">
                                            Featured
                                        </FormLabel>
                                        <FormDescription>
                                            If featured is true, this product will appear on the store page.
                                        </FormDescription>
                                    </div>
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