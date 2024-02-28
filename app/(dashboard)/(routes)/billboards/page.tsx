import { format } from "date-fns"
import Container from "@/components/ui/container"
import BillboardClient from "./components/client"
import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";


const BillboardPage = async () => {
    const currentUser = await getCurrentUser();
    const billboards = await prisma.billboard.findMany({
        where: {
            userId: currentUser?.id
        },
        orderBy: {
            createAt: "desc"
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createAt: format(item.createAt, "MMMM dd, yyyy")
    }))

    return (
        <Container>
            <BillboardClient data={formattedBillboards} />
        </Container>
    )
}

export default BillboardPage