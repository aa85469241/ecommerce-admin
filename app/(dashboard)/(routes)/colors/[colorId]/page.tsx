import Container from "@/components/ui/container"
import prisma from "@/lib/prismadb"
import { ColorForm } from "./components/color-form"


const ColorPage = async ({
    params
}: { params: { colorId: string } }) => {
    const color = await prisma.color.findUnique({
        where: {
            id: params.colorId
        }
    })

    return (
        <Container>
            <ColorForm initialValues={color} />
        </Container>
    )
}

export default ColorPage