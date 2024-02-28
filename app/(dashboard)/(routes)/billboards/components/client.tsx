'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { BillboardColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ApiList } from '@/components/ui/api-list';

interface BillboardClientProps {
    data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title="Billboard" description="Manage your billboard" />
                <Button
                    size="sm"
                    onClick={() => router.push("/billboards/new")}
                >
                    + Add new
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="label" columns={columns} data={data} />
            <Heading title='API Keys' />
            <Separator />
            <ApiList entryName='billboards' entryIdName='billboardId' />
        </>
    )
}

export default BillboardClient