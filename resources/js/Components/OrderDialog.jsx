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

export default function OrderDialog({
    title,
    itemSrc,
    itemName,
    itemCost,
    quantity,
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <ReceiptLongIcon fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-center">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="flex justify-between px-2">
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
                            <button className="px-3 text-xs bg-main text-white">
                                Buy Again
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
