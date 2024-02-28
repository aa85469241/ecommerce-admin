import { format } from 'date-fns'
import prisma from '@/lib/prismadb'
import Container from '@/components/ui/container'
import ColorsClient from './components/client'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { ColorColumn } from './components/columns'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DashBoard - Color',
}

const ColorsPage = async () => {
    const currentUser = await getCurrentUser();
    const colors = await prisma.color.findMany({
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedColors: ColorColumn[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <ColorsClient data={formattedColors} />
        </Container>
    )
}

export default ColorsPage;