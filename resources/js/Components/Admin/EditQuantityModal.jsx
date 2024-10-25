import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
} from "@/shadcdn/ui/dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function EditQuantity(product) {
    const [quantity, setQuantity] = useState(product.STOCK_QUANTITY);

    const handleQuantity = (value) => {
        if (value == 0) {
            setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pencil1Icon />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader className="text-center">
                    Edit Quantity
                </DialogHeader>
                <div class="flex sm:items-center sm:justify-center w-full">
                    <button
                        class="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                        onClick={() => handleQuantity(0)}
                    >
                        <svg
                            class="stroke-gray-900 group-hover:stroke-black"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                            <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                            <path
                                d="M16.5 11H5.5"
                                stroke=""
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                        </svg>
                    </button>
                    <input
                        type="text"
                        class="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                        placeholder="1"
                        value={product.STOCK_QUANTITY}
                    />
                    <button
                        class="group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                        onClick={() => {
                            handleQuantity(1);
                        }}
                    >
                        <svg
                            class="stroke-gray-900 group-hover:stroke-black"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke="#9CA3AF"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                            <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke="black"
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                            <path
                                d="M11 5.5V16.5M16.5 11H5.5"
                                stroke="black"
                                stroke-opacity="0.2"
                                stroke-width="1.6"
                                stroke-linecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
