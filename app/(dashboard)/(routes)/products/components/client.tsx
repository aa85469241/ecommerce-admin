'use client';

import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { ProductColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ApiList } from '@/components/ui/api-list';

interface ProductsClientProps {
    data: ProductColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Products"
                    description="Manage the specifications of the products."
                />
                <Button
                    size="sm"
                    onClick={() => router.push("/products/new")}
                >
                    + Add new
                </Button>
            </div>
            <Separator />
            <DataTable
                searchKey="name"
                columns={columns}
                data={data}
            />
            <Heading title="API Keys"/>
            <Separator />
            <ApiList entryName="products" entryIdName="productId"/>
        </>
    )
}

export default ProductsClient