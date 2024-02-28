import { format } from 'date-fns'
import prisma from '@/lib/prismadb'
import Container from '@/components/ui/container'
import SizesClient from './components/client'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { SizeColumn } from './components/columns'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'DashBoard - Size',
}

const SizesPage = async () => {
    const currentUser = await getCurrentUser();
    const sizes = await prisma.size.findMany({
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <SizesClient data={formattedSizes} />
        </Container>
    )
}

export default SizesPage