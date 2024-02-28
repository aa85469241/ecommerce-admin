'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { CategoryColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ApiList } from '@/components/ui/api-list';

interface CategoriesClientProps {
    data: CategoryColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Category"
                    description="Manage your categories"
                />
                <Button
                    size="sm"
                    onClick={() => router.push("/categories/new")}
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
            <ApiList entryName="categories" entryIdName="categoryId"/>
        </>
    )
}

export default CategoriesClient