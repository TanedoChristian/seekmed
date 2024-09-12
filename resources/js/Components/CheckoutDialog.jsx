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
export default function CheckoutDialog({
    title,
    itemSrc,
    itemName,
    itemCost,
    quantity,
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ShoppingCart fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="text-center">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="p-2">
                    <div className="flex justify-between px-2 mb-2">
                        <img
                            src={itemSrc}
                            alt=""
                            className="w-10 h-10 object-cover"
                        />
                        <div className="">
                            <h1 className="font-semibold text-md">
                                {itemName}
                            </h1>
                            <div className="flex gap-3 items-center">
                                <span>x{quantity}</span>
                                <p className="text-sm -mr-2">
                                    Total Orders:
                                    <span className="text-cyan-500 text-md ">
                                        P {itemCost}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Completed</p>
                            <button className="px-3 text-xs bg-main text-white py-1 rounded-sm outline-none">
                                Buy Again
                            </button>
                        </div>
                    </div>
                    <Divider />
                    <p className="p-2 text-sm">Add more items</p>
                    <Divider />
                    <div className="flex justify-between p-2 text-sm">
                        <p>Sanciangko St. University of Cebu Main Campus</p>
                        <p className="text-sm"> Edi Address</p>
                    </div>

                    <div className="flex flex-col justify-center p-2 text-sm">
                        <div className="flex flex-col w-[95%] rounded-sm">
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
                            <p className="">P 7,740.00</p>
                        </div>
                        <div className="flex justify-between px-3">
                            <p className="text-sm">Delivery Fee</p>
                            <p className="">P 70.00</p>
                        </div>
                    </div>

                    <Divider />
                    <div className="p-2">
                        <div className="flex justify-between px-3">
                            <p className="text-sm">Total Order:</p>
                            <p className="">P 7,740.00</p>
                        </div>
                    </div>

                    <div className="flex w-full p-3">
                        <button className="bg-main text-white text-sm">
                            Place Order
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
