import { setOrderCompleted } from "@/state/deliveryRiderSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrdercCompleted() {
    const orderHistory = useSelector(
        (state) => state.deliveryRider.orderCompleted
    );

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/api/rider/orders/history").then(({ data }) => {
            dispatch(setOrderCompleted(data));
        });
    }, []);

    // {orderHistory.length > 0 ? "Data" : "None"}

    return (
        <div className="w-full">
            <table className=" min-w-full  rounded-xl  ">
                <thead className="border-b">
                    <tr className="font-light">
                        <th
                            scope="col"
                            className="p-7 text-left  leading-6 font-light text-gray-700 capitalize"
                        >
                            Delivery ID
                        </th>

                        <th
                            scope="col"
                            className="p-7    font-light text-gray-700 capitalize text-center"
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
                            className="p-7    font-light text-gray-700 capitalize text-center"
                        >
                            Address
                        </th>
                        <th
                            scope="col"
                            className="p-7    font-light text-gray-700 capitalize text-center"
                        >
                            Contact Number
                        </th>
                        <th
                            scope="col"
                            className="p-7 text-left  font-light text-gray-700 capitalize"
                        >
                            Delivery Date
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 ">
                    {orderHistory.map((delivery) => (
                        <tr className="">
                            <td className="p-7 whitespace-nowrap  leading-6 font-medium text-gray-900 ">
                                #{delivery.id}
                            </td>

                            <td className="p-7 whitespace-nowrap  text-center leading-6 font-medium text-gray-900">
                                {delivery.ORDER_ID}
                            </td>
                            <td className="p-7 whitespace-nowrap  text-center leading-6 font-medium text-gray-900">
                                {delivery.PAYMENT_METHOD}
                            </td>
                            <td className="p-7 whitespace-nowrap  text-center leading-6 font-medium text-gray-900">
                                {delivery.address}
                            </td>
                            <td className="p-7 whitespace-nowrap  text-center leading-6 font-medium text-gray-900">
                                {delivery.contact_number}
                            </td>
                            <td className="p-7 whitespace-nowrap  leading-6 font-medium text-gray-900">
                                {delivery.DELIVERY_DATE}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
