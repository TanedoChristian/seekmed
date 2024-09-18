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
    imageSrc,
    itemName,
    itemCost,
    quantity,
    open,
    setIsOpen,
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ShoppingCart fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="text-center"></DialogHeader>
                <div class="w-full text-center text-black text-3xl font-bold font-manrope leading-normal">
                    Checkout
                </div>
                <div className="p-2">
                    <div className="flex gap-3 justify-between px-2 mb-2 items-center">
                        <img
                            src={imageSrc}
                            alt=""
                            className="w-10 h-10 object-cover"
                        />
                        <div className="">
                            <h1 className="font-semibold text-md">
                                {itemName}
                            </h1>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button className="outline-none font-semibold">
                                -
                            </button>
                            <span className="outline-none">2</span>
                            <button className="outline-none font-semibold">
                                +
                            </button>
                        </div>
                        <div className="">
                            <h1 className="font-semibold text-md">$50.00</h1>
                        </div>

                        <button className="px-3 py-1 text-sm  text-red-500 font-semibold">
                            Remove
                        </button>
                    </div>
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
                </div>
            </DialogContent>
        </Dialog>
    );
}
