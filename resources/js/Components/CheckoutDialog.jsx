import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";
import { ShoppingCart } from "@mui/icons-material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Divider } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
export default function CheckoutDialog({
    title,
    imageSrc,
    itemName,
    itemCost,
    quantity,
    open,
    setIsOpen,
    activeCarts,
    setActiveCarts,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const removeFromCart = (index) => {
        setActiveCarts((prevCarts) => {
            const updatedCarts = [...prevCarts];
            updatedCarts.splice(index, 1);
            return updatedCarts;
        });

        Swal.fire({
            title: "Removed!",
            text: `${item} has been removed from your cart.`,
            icon: "success",
        });
    };

    const subtotal = activeCarts.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
    );

    const postActiveCarts = async () => {
        const response = axios
            .post("/api/orders", {
                user_id: 1,
                active_carts: activeCarts,
            })
            .then((data) => {
                setIsOpen(false);

                Swal.fire({
                    title: "Added!",
                    text: `Added to order.`,
                    icon: "success",
                });
            })
            .catch((err) => {
                setIsOpen(false);
                Swal.fire({
                    title: "Error!",
                    text: `Something went wrong`,
                    icon: "error",
                });
            });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ShoppingCart fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="text-center"></DialogHeader>
                <div class="w-full text-center text-black text-3xl font-bold font-manrope leading-normal">
                    Checkout
                </div>
                <div className="p-2">
                    {activeCarts.length > 0 ? (
                        activeCarts.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between px-2 mb-2"
                            >
                                <img
                                    src={item.img}
                                    alt=""
                                    className="w-10 h-10 object-cover"
                                />
                                <div className="flex-grow mx-2">
                                    <h1 className="font-semibold text-md">
                                        {item.item}
                                    </h1>
                                </div>
                                <span className="outline-none">
                                    x{item.quantity}
                                </span>
                                <div className="">
                                    <h1 className="font-semibold text-md">
                                        ₱
                                        {(item.price * item.quantity).toFixed(
                                            2
                                        )}
                                    </h1>
                                </div>

                                <button
                                    className="px-3 py-1 text-sm text-red-500 font-semibold"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Empty cart.</p>
                    )}
                    <Divider />
                    <p className="p-2 text-sm">Add more items</p>
                    <Divider />
                    <div className="flex justify-between p-2 text-sm">
                        <p>Sanciangko St. University of Cebu Main Campus</p>
                        <p className="text-sm"> Edit Address</p>
                    </div>

                    <div className="flex flex-col justify-center p-2 text-sm">
                        <div className="flex flex-col  rounded-sm">
                            <div className="text-white bg-main p-2 text-center ">
                                Payment Method
                            </div>
                            <div className="flex justify-between gap-1">
                                <div className="py-1 px-3 bg-gray-300 w-[50%]">
                                    Cash on Delivery
                                </div>
                                <div className="py-1 px-3 bg-gray-300 w-[50%]">
                                    Gcash
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className="p-2">
                        <div className="flex justify-between px-3">
                            <p className="text-sm">Subtotal</p>
                            <p className="">₱ {subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between px-3">
                            <p className="text-sm">Delivery Fee</p>
                            <p className="">₱ 50.00</p>
                        </div>
                    </div>

                    <Divider />
                    <div className="p-2">
                        <div className="flex justify-between px-3">
                            <p className="text-sm">Total Order:</p>
                            <p className="">₱ {subtotal + 50}</p>
                        </div>
                    </div>

                    <div className="flex justify-end p-3">
                        <button
                            className="bg-main text-sm text-white px-5 py-1.5"
                            onClick={postActiveCarts}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
