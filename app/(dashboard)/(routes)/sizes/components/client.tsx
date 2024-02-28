'use client';

import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { SizeColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ApiList } from '@/components/ui/api-list';

interface SizesClientProps {
    data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Sizes"
                    description="Manage the specifications of the sizes."
                />
                <Button
                    size="sm"
                    onClick={() => router.push("/sizes/new")}
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
            <ApiList entryName="sizes" entryIdName="sizeId"/>
        </>
    )
}

export default SizesClient