import prisma from "@/lib/prismadb"
import Container from "@/components/ui/container"
import { BillboardForm } from "./components/billboard-form"

interface BillboardProps {
    params: { billboardId: string },
}

const BillboardPage = async ({
    params
}: BillboardProps) => {
    const billboard = await prisma.billboard.findUnique({
        where: {
            id: params.billboardId,
        }
    })

    return (
        <Container>
            <BillboardForm initialValues={billboard}/>
        </Container>
    )
}

export default BillboardPage