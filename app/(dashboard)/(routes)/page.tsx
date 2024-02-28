import { getProductsInStock } from "@/actions/getProductsInStock";
import { getRevenue } from "@/actions/getRevenue";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { FiDollarSign, FiPackage } from "react-icons/fi";
import { BsCreditCard2Back } from "react-icons/bs";
import { getSales } from "@/actions/getSales";
import Overview from "@/components/overview";
import { getGraphData } from "@/actions/getGraphData";
import RecentSales from "@/components/recent-sales";
import { getMonthlyOrders } from "@/actions/getMonthlyOrders";


const DashboardPage = async () => {
    const totalRevenue = await getRevenue();
    const productsInStock = await getProductsInStock();
    const salesTotal = await getSales();
    const graphData = await getGraphData();
    const monthlyOrders = await getMonthlyOrders();

    const monthlyOrderItems = monthlyOrders.flatMap(order => order.orderItems)
    const monthlySales = monthlyOrderItems.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <Container>
            <Heading title="Dashboard" description="Organize your store" />
            <Separator />
            <div className="grid grid-cols-3 gap-2 items-center md:gap-4">
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 p-3 md:p-6">
                        <CardTitle className="text-sm font-medium md:text-base">
                            Total Revenue
                        </CardTitle>
                        <FiDollarSign className="text-sm md:text-base" />
                    </CardHeader>
                    <CardContent className="p-3 md:p-6">
                        <div className="text-xl font-semibold md:text-2xl">
                            {formatPrice.format(totalRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 p-3 md:p-6">
                        <CardTitle className="text-sm font-medium md:text-base">
                            Sales
                        </CardTitle>
                        <BsCreditCard2Back className="text-sm md:text-base" />
                    </CardHeader>
                    <CardContent className="p-3 md:p-6">
                        <div className="text-xl font-semibold md:text-2xl">
                            {salesTotal} <span className="text-sm">{salesTotal > 1 ? "pieces" : "piece"}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between space-y-0 p-3 md:p-6">
                        <CardTitle className="text-sm font-medium md:text-base">
                            Product in Stock
                        </CardTitle>
                        <FiPackage className="text-sm md:text-base" />
                    </CardHeader>
                    <CardContent className="p-3 md:p-6">
                        <div className="text-xl font-semibold md:text-2xl">
                            {productsInStock} <span className="text-sm">{productsInStock > 1 ? "pieces" : "piece"}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-flow-row gap-4 h-full md:grid-cols-[60%_auto]">
                <Card>
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[240px] overflow-y-hidden">
                        <Overview data={graphData} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>You made {monthlySales} sales this month</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[240px] overflow-y-hidden">
                        <RecentSales data={monthlyOrders} />
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}

export default DashboardPage;