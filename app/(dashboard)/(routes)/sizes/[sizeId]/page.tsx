import Container from "@/components/ui/container"
import prisma from "@/lib/prismadb"
import { SizeForm } from "./components/size-form"


const SizePage = async ({
    params
}: { params: { sizeId: string } }) => {
    const size = await prisma.size.findUnique({
        where: {
            id: params.sizeId
        }
    })

    return (
        <Container>
            <SizeForm initialValues={size} />
        </Container>
    )
}

export default SizePage