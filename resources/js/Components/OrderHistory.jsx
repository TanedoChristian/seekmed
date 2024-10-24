import {
    CheckIcon,
    CubeIcon,
    EyeClosedIcon,
    EyeOpenIcon,
} from "@radix-ui/react-icons";
import OrderStatus from "./OrderStatus";
import {
    BlockOutlined,
    LocalShipping,
    LocalShippingOutlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ReviewDialog from "./ReviewDialog";

export default function OrderHistory({ orders }) {
    const uniqueOrders = Array.from(
        new Set(orders.map((order) => order.order_id))
    ).map((id) => orders.find((order) => order.order_id === id));

    const doneOrders = orders.filter((order) => order.STATUS == "done");
    const rejectedOrders = orders.filter((order) => order.STATUS == "rejected");
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold tracking-wide"> Order History</h1>
            <p className="text-gray-500 text-sm font-light mt-3 tracking-wide">
                Order History Is Track Your Purchases and View Past Orders
            </p>

            <div className="w-full flex gap-4">
                <OrderStatus
                    icon={<CubeIcon width={20} height={20} />}
                    number={orders.length ? orders.length - 1 : 0}
                    title="Total Orders"
                    bgColor="bg-blue-100"
                    color="text-blue-600"
                />

                <OrderStatus
                    icon={<CheckIcon width={30} height={30} />}
                    number={doneOrders.length ? doneOrders.length - 1 : 0}
                    title="Completed"
                    bgColor="bg-yellow-100"
                    color="text-yellow-500"
                />
                <OrderStatus
                    icon={<BlockOutlined />}
                    number={
                        rejectedOrders.length ? rejectedOrders.length - 1 : 0
                    }
                    title="Rejected"
                    bgColor="bg-red-100"
                    color="text-red-500"
                />
            </div>

            <div className="flex flex-col mt-10">
                <div className=" overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-auto  rounded-lg">
                            <table className=" min-w-full  rounded-xl border ">
                                <thead className="border-b">
                                    <tr className="font-light">
                                        <th
                                            scope="col"
                                            className="p-7 text-left  leading-6 font-light text-gray-700 capitalize"
                                        >
                                            Order ID
                                        </th>

                                        <th
                                            scope="col"
                                            className="p-7    font-light text-gray-700 capitalize text-center"
                                        >
                                            Payment Method
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-7 text-left  font-light text-gray-700 capitalize"
                                        >
                                            Order Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-7 text-left  font-light text-gray-700 capitalize"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300 ">
                                    {uniqueOrders.map((order) => (
                                        <tr className="">
                                            <td className="p-7 whitespace-nowrap  leading-6 font-medium text-gray-900 ">
                                                #{order.order_id}
                                            </td>

                                            <td className="p-7 whitespace-nowrap  text-center leading-6 font-medium text-gray-900">
                                                {order.PAYMENT_METHOD}
                                            </td>
                                            <td className="p-7 whitespace-nowrap  leading-6 font-medium text-gray-900">
                                                {order.ORDER_DATE}
                                            </td>
                                            <td className="p-7 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                <button
                                                    className="px-10 py-2 bg-main rounded-sm text-white"
                                                    onClick={() => {
                                                        window.location.href = `/products/${order.order_id}`;
                                                    }}
                                                >
                                                    Add Review
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
