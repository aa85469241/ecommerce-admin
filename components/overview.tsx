'use client';

import { GraphDataProps } from '@/actions/getGraphData';
import { formatPrice } from '@/lib/utils';
import { ResponsiveContainer, Bar, BarChart, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface OverviewProps {
    data: GraphDataProps[];
}

const CustomTooltip = ({
    active,
    payload,
    label
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-600/70 p-3 rounded-md mx-2 space-y-2">
                <p className="text-white">{`Date: ${label}`}</p>
                <p className="text-white">
                    {`Total: ${formatPrice.format(Number(payload[0].value))}`}
                </p>
            </div>
        )
    }
}

const Overview: React.FC<OverviewProps> = ({
    data
}) => {

    return (
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Overview