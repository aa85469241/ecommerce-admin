'use client';

import { useRouter } from 'next/navigation';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { ColorColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ApiList } from '@/components/ui/api-list';

interface ColorsClientProps {
    data: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Colors"
                    description="Manage the specifications of the colors."
                />
                <Button
                    size="sm"
                    onClick={() => router.push("/colors/new")}
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
            <ApiList entryName="colors" entryIdName="colorId"/>
        </>
    )
}

export default ColorsClient