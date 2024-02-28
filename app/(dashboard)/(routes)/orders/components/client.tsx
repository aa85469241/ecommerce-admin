'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading'
import { OrderColumn, columns } from './columns';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

interface OrdersClientProps {
    data: OrderColumn[];
}

const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
    const nonEmptyData = data.filter(item => item.products.length !== 0);

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title="Orders"
                    description="Manage the orders."
                />
            </div>
            <Separator />
            <DataTable
                searchKey="purchaser"
                columns={columns}
                data={nonEmptyData}
            />
            <Heading title="API Keys" />
            <Separator />
            <ApiList entryName="orders" entryIdName="productId" />
        </>
    )
}

export default OrdersClient