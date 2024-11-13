import { BarChart } from "@mui/x-charts";

export default function Reports({ orders }) {
    const totalOrdersByMonth = (month) => {
        return orders.filter((order) => {
            const orderMonth = new Date(order.ORDER_DATE).getMonth() + 1;
            return orderMonth === month;
        }).length;
    };

    const monthlyOrderData = Array.from({ length: 12 }, (_, i) =>
        totalOrdersByMonth(i + 1)
    );

    return (
        <BarChart
            xAxis={[
                {
                    scaleType: "band",
                    data: [
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
                    ],
                },
            ]}
            series={[{ data: monthlyOrderData, label: "Total Orders" }]}
            width={500}
            height={300}
        />
    );
}
