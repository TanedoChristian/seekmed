import React, { useState, useEffect } from "react";
// import Pusher from "pusher-js";
import axios from "axios";

const MessageBox = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    // useEffect(() => {
    //     const pusher = new Pusher("0f60d240a7e37c6b2818", {
    //         cluster: "ap1",
    //         encrypted: true,
    //     });

    //     const channel = pusher.subscribe("channel");
    //     channel.bind("my-event", (data) => {
    //         console.log(data);
    //     });

    //     return () => {
    //         pusher.unsubscribe("channel");
    //         pusher.disconnect();
    //     };
    // }, []);

    const handleSendMessage = async () => {
        if (inputValue.trim() === "") return;
        const messageData = { message: inputValue, user: "A" };
        await axios.post("/message", messageData);
        setInputValue("");
    };

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`col-start-${
                                        msg.user === "A" ? "6" : "1"
                                    } col-end-${
                                        msg.user === "A" ? "13" : "8"
                                    } p-3 rounded-lg`}
                                >
                                    <div
                                        className={`flex ${
                                            msg.user === "A"
                                                ? "justify-start flex-row-reverse"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                            {msg.user}
                                        </div>
                                        <div
                                            className={`relative ${
                                                msg.user === "A"
                                                    ? "mr-3 text-sm bg-indigo-100"
                                                    : "ml-3 text-sm bg-white"
                                            } py-2 px-4 shadow rounded-xl`}
                                        >
                                            <div>{msg.message}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
        </div>
    );
};

export default MessageBox;
