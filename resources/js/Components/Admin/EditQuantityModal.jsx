import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
} from "@/shadcdn/ui/dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function EditQuantity({ product, onUpdate }) {
    const [quantity, setQuantity] = useState(product.STOCK_QUANTITY);

    const handleQuantity = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 0) {
            // Prevent negative quantities
            setQuantity(newQuantity);
        }
    };

    const handleSave = () => {
        // Call the onUpdate function passed from parent with new quantity
        if (onUpdate) {
            onUpdate(product.id, quantity);
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
                <div className="flex sm:items-center sm:justify-center w-full">
                    <button
                        className="group py-4  rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 text-3xl font-bold"
                        onClick={() => handleQuantity(-1)}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        className="font-semibold text-gray-900 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0  bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50"
                        placeholder="1"
                        value={quantity}
                        readOnly
                    />
                    <button
                        className="group py-4  rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 text-2xl font-bold"
                        onClick={() => handleQuantity(1)}
                    >
                        +
                    </button>
                </div>
                <button
                    onClick={handleSave}
                    className="mt-4 p-2 bg-blue-500 text-white rounded"
                >
                    Update Quantity
                </button>
            </DialogContent>
        </Dialog>
    );
}
