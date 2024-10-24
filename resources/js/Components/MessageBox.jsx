import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useSelector } from "react-redux";
import MyMap from "./Location/MapRealtime";
import Swal from "sweetalert2";

const MessageBox = ({ setTableCategory }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const orders = useSelector((state) => state.order);

    useEffect(() => {
        const messageData = {
            message: `<h1 style="font-weight: bold">This is Automated message </h1> <br/> Order ID: ${orders.order_id} <br /> Customer Name: ${orders.name} <br /> Address: ${orders.address}`,
            user: "B",
            channelId: orders.user_id,
        };
        axios.post("/message", messageData);
    }, []);

    useEffect(() => {
        const pusher = new Pusher("0f60d240a7e37c6b2818", {
            cluster: "ap1",
            encrypted: true,
        });

        const channel = pusher.subscribe(`chat-channel-${orders.user_id}`);
        channel.bind("my-event", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            pusher.unsubscribe(`chat-channel-${orders.user_id}`);
            pusher.disconnect();
        };
    }, []);

    const handleSendMessage = async () => {
        if (inputValue.trim() === "") return;
        const messageData = {
            message: inputValue,
            user: "B",
            channelId: orders.user_id,
        };
        await axios.post("/message", messageData);
        setInputValue("");
    };

    const handleCart = async () => {
        const messageData = {
            message: inputValue,
            user: "B",
            status: "done",
            channelId: orders.user_id,
        };
        await axios.post("/message", messageData);
    };

    const updateOrder = async (id) => {
        const payload = {
            id: id,
            STATUS: "done",
            cart_id: orders.cart_id,
        };

        const response = await axios.put("/api/orders/update", payload);

        if (response.status == 200) {
            Swal.fire({
                title: `Status updated to ${payload.STATUS}`,
                icon: "success",
            });
            handleCart();
            window.location.href = "/rider/dashboard";
        }
    };

    return (
        <div className="flex justify-between h-[92vh]">
            <div className="w-[70%] overflow-hidden">
                <MyMap lat={orders.latitude} lon={orders.longitude} />
            </div>
            <div className="flex flex-col flex-auto h-full p-6 w-[30%]">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-[80vh] p-4">
                    <div className="flex flex-col h-full overflow-x-auto mb-4">
                        <div className="flex flex-col h-full">
                            {messages.map((msg, index) =>
                                msg.user == "B" ? (
                                    <div className="w-full flex  mt-2 justify-end gap-3 items-center p-2">
                                        <div className="relative py-2 px-4 shadow rounded-xl bg-white text-gray-900">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: msg.message,
                                                }}
                                            />
                                        </div>
                                        <div key={index} className="">
                                            <div className="">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 mr-2">
                                                    {msg.user}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full flex mt-2">
                                        <div key={index} className="">
                                            <div className="flex justify-start">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 mr-2">
                                                    {msg.user}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative py-2 px-4 shadow rounded-xl bg-white text-gray-900">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: msg.message,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="flex-grow ml-4">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                            />
                        </div>
                        <button
                            onClick={handleSendMessage}
                            className="ml-4 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        >
                            <span>Send</span>
                        </button>
                    </div>
                </div>
                <button
                    className="py-2 w-full rounded-sm text-white bg-main mt-3 shadow-md hover:bg-blue-700"
                    onClick={() => {
                        updateOrder(orders.order_id);
                    }}
                >
                    Done Deliver
                </button>
            </div>
        </div>
    );
};

export default MessageBox;
