import { BarChart, PieChart } from "@mui/x-charts";

export default function Reports({
    orders,
    totalRevenuePerProduct,
    productsSoldPerMonth,
    totalReturnPerProduct,
}) {
    const totalOrdersByMonth = (month, status) => {
        return orders.filter((order) => {
            const orderMonth = new Date(order.ORDER_DATE).getMonth() + 1;
            return orderMonth === month && order.STATUS === status;
        }).length;
    };

    const monthlyCompletedOrders = Array.from({ length: 12 }, (_, i) =>
        totalOrdersByMonth(i + 1, "done")
    );

    const monthlyCancelledOrders = Array.from({ length: 12 }, (_, i) =>
        totalOrdersByMonth(i + 1, "cancel")
    );

    // Prepare data for PieChart (Products Sold Per Month)
    const pieChartData = productsSoldPerMonth.map((item, index) => ({
        id: index,
        value: item.total_quantity,
        label: item.PRODUCT_NAME,
    }));

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Prepare data for BarChart (Total Sales Per Product)
    const barChartData = totalRevenuePerProduct.map((item, index) => ({
        id: index,
        value: parseFloat(item.total_price),
        label: item.PRODUCT_NAME,
    }));

    // Prepare data for Total Returns BarChart
    const returnBarChartData = Array.from({ length: 12 }, (_, monthIndex) => {
        return totalReturnPerProduct.reduce((acc, item) => {
            if (item.RETURN_MONTH === monthIndex + 1) {
                acc.push({
                    label: item.PRODUCT_NAME,
                    value: item.TOTAL_RETURNS,
                });
            }
            return acc;
        }, []);
    });

    // Prepare series data for the returns bar chart
    const returnSeries = [];

    // Collect unique product names
    const uniqueProducts = [
        ...new Set(totalReturnPerProduct.map((item) => item.PRODUCT_NAME)),
    ];

    uniqueProducts.forEach((productName) => {
        const productData = returnBarChartData.map((monthReturns) => {
            const found = monthReturns.find(
                (item) => item.label === productName
            );
            return found ? found.value : 0; // Return value or 0 if not found
        });

        returnSeries.push({
            label: productName,
            data: productData,
        });
    });

    return (
        <div className="flex flex-wrap gap-10 items-center justify-center">
            <h1 className="w-full text-center text-3xl text-white font-medium ">
                Summary
            </h1>

            {/* BarChart for Completed and Cancelled Orders */}
            <div className="p-3 bg-white shadow-md rounded-md">
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: months,
                        },
                    ]}
                    series={[
                        {
                            data: monthlyCompletedOrders,
                            label: "Completed Orders",
                        },
                        {
                            data: monthlyCancelledOrders,
                            label: "Cancelled Orders",
                            color: "red",
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>

            {/* BarChart for Total Sales Per Product */}
            <div className="flex flex-col items-center shadow-md p-5 bg-white">
                <h1 className="w-full text-xl font-medium text-center">
                    Total Sales Per Product
                </h1>
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: barChartData.map((item) => item.label),
                        },
                    ]}
                    series={[
                        {
                            data: barChartData.map((item) => item.value),
                            label: "Total Sales",
                        },
                    ]}
                    width={500}
                    height={260}
                />
            </div>

            {/* PieChart for Products Sold Per Month */}
            <div className="p-3 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-medium text-center mb-3">
                    Products Sold Per Month
                </h2>
                <PieChart
                    series={[
                        {
                            data: pieChartData,
                        },
                    ]}
                    width={500}
                    height={260}
                />
            </div>

            {/* BarChart for Total Returns Per Month */}
            <div className="flex flex-col items-center shadow-md p-5 bg-white">
                <h1 className="w-full text-xl font-medium text-center">
                    Total Returns Per Month
                </h1>
                <BarChart
                    xAxis={[
                        {
                            scaleType: "band",
                            data: months, // Use month names on x-axis
                        },
                    ]}
                    series={returnSeries} // Use prepared series data
                    width={500}
                    height={260}
                />
            </div>
        </div>
    );
}
