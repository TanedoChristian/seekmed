import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderDialog({ user }) {
    const [orders, setOrders] = useState([]);
    const [subtotal, setSubtotal] = useState();

    useEffect(() => {
        axios.get(`/api/customer/orders`).then(({ data }) => {
            console.log(data);
            setOrders(data);
        });
    }, []);

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = orders.reduce((acc, product) => {
                return acc + parseFloat(product.price) * product.quantity;
            }, 0);
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [orders]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ReceiptLongIcon fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70vw] h-[80vh]">
                {orders.length > 0 ? (
                    <section class="p-3 relative">
                        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                            <h2 class="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
                                Order Placed
                            </h2>
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-3 border-y border-gray-100 mb-6">
                                <div class="box group">
                                    <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                        Order
                                    </p>
                                    <h6 class="font-semibold font-manrope  leading-9 text-black">
                                        {orders[0].order_id}
                                    </h6>
                                </div>
                                <div class="box group">
                                    <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                        Payment Method
                                    </p>
                                    <h6 class="font-semibold font-manrope  leading-9 text-black">
                                        {orders[0].PAYMENT_METHOD}
                                    </h6>
                                </div>
                                <div class="box group">
                                    <p class="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                                        Address
                                    </p>
                                    <h6 class="font-semibold font-manrope leading-9 text-black">
                                        {orders[0].address}
                                    </h6>
                                </div>
                            </div>
                            <div className="h-[30vh] overflow-auto  border p-5">
                                {orders.map((order) => (
                                    <div class="grid grid-cols-7 w-full pb-5 border-b border-gray-100">
                                        <div class="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                                            <img
                                                src={order.image}
                                                alt="Skin Care Kit image"
                                                class=" rounded-xl object-cover h-20 w-20"
                                            />
                                        </div>
                                        <div class="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                                            <div class="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
                                                <div class="">
                                                    <h5 class="font-manrope font-semibold  leading-9 text-black ">
                                                        {order.PRODUCT_NAME}
                                                    </h5>
                                                    <p class="font-normal  leading-8 text-gray-500">
                                                        Quantity :{" "}
                                                        <span class="text-black font-semibold">
                                                            {order.quantity}
                                                        </span>
                                                    </p>
                                                </div>

                                                <h5 class="font-manrope font-semibold text-lg leading-10 text-black sm:text-right mt-3">
                                                    {order.price}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div class="flex items-center justify-center sm:justify-end w-full py-5  ">
                                <div class=" w-full">
                                    <div class="flex items-center justify-between ">
                                        <p class="font-normal text-xl leading-8 text-gray-500 mb-2">
                                            Subtotal
                                        </p>
                                        <p class="font-semibold text-xl leading-8 text-gray-900">
                                            ₱{subtotal.toFixed(2)}
                                        </p>
                                    </div>
                                    <div class="flex items-center justify-between ">
                                        <p class="font-normal text-xl leading-8 text-gray-500 mb-2">
                                            Delivery Fee
                                        </p>
                                        <p class="font-semibold text-xl leading-8 text-gray-900">
                                            ₱50.00
                                        </p>
                                    </div>

                                    <div class="flex items-center justify-between py-2 border-y border-gray-100">
                                        <p class="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                                            Total
                                        </p>
                                        <p class="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                                            ₱{(subtotal + 50).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="w-full h-full justify-center flex items-center">
                        <h1 className="text-4xl font-bold">
                            No Order Placed Yet
                        </h1>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
