import { Input } from "@/shadcdn/ui/input";
import { Label } from "@/shadcdn/ui/label";
import { Link } from "@inertiajs/react";
import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Products({ orders }) {
    const [localOrders, setOrders] = useState(orders);

    const [value, setValue] = useState(0);

    const [feedback, setFeedback] = useState(
        orders.map((order) => ({
            FEEDBACK: "",
            Rating: 0,
            product_id: order.product_id,
            order_id: order.order_id,
            user: order.USER_ID,
        }))
    );

    const handleFeedback = (productId) => {
        const specificFeedback = feedback.find(
            (item) => item.product_id === productId
        );

        axios.post(`/api/reviews`, specificFeedback).then(({ data }) => {
            Swal.fire({
                title: "Thank you for submitting your review!",
                icon: "success",
                showCloseButton: true,
            });
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.product_id !== productId)
            );
        });
    };

    const handleRating = (rating, order) => {
        setFeedback((prev) =>
            prev.map((fb) =>
                fb.product_id === order.product_id
                    ? { ...fb, Rating: rating }
                    : fb
            )
        );
    };

    const handleFeedbackInput = (e, order) => {
        setFeedback((prev) => {
            return prev.map((fb) =>
                fb.product_id === order.product_id
                    ? { ...fb, FEEDBACK: e.target.value }
                    : fb
            );
        });
    };

    return (
        <div className="w-full">
            <nav className="bg-[#499392] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <h1 className="text-3xl font-extrabold text-white">
                                        SEEKMED
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        <div className="w-[40%] flex flex-col gap-3">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="bg-white text-black"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="">
                <section class="py-10 ">
                    <div class="mx-auto max-w-[83rem] p-10 ">
                        <div className="flex justify-between">
                            <h2 class="font-manrope text-4xl font-bold text-gray-900 text-center mb-14">
                                Product Review
                            </h2>
                            <h2 class="font-manrope text-2xl  text-gray-500 text-center mb-14">
                                Order ID #499392
                            </h2>
                        </div>
                        <div class="flex w-full gap-10 flex-wrap ">
                            {localOrders.map((order) => (
                                <div class=" cursor-pointer w-full max-lg:max-w-xl lg:w-1/4 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
                                    <div className="flex justify-between p-3">
                                        <h1 className="text-lg">
                                            {order.PRODUCT_NAME}
                                        </h1>
                                        <p>{order.price}</p>
                                    </div>
                                    <div class="flex items-center mb-6">
                                        <img
                                            src={order.image}
                                            alt="Alexa image"
                                            class="rounded-lg w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Label className="text-gray-500 ">
                                            Rate
                                        </Label>

                                        <Rating
                                            className="mt-3"
                                            name="simple-controlled"
                                            value={
                                                feedback.find(
                                                    (fb) =>
                                                        fb.product_id ===
                                                        order.product_id
                                                )?.Rating || 0
                                            }
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                                handleRating(newValue, order);
                                            }}
                                        />
                                    </div>

                                    <div class="block mt-3">
                                        <Label className="text-gray-500 ">
                                            Write A Review
                                        </Label>
                                        <Input
                                            className="h-[15vh] rounded-md shadow-sm"
                                            onChange={(e) => {
                                                handleFeedbackInput(e, order);
                                            }}
                                        />

                                        <div class="flex items-center justify-center mt-5">
                                            <button
                                                className="bg-main text-white rounded-md px-10 py-2"
                                                onClick={() => {
                                                    handleFeedback(
                                                        order.product_id
                                                    );
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
