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
import OrderHistory from "./OrderHistory";

export default function OrderDialog({ user }) {
    const [orders, setOrders] = useState([]);
    const [subtotal, setSubtotal] = useState();

    const [open, setIsOpen] = useState(false);
    useEffect(() => {
        axios.get(`/api/customer/orders`).then(({ data }) => {
            setOrders(data);
            setOrders((prev) => prev.filter((order) => order.STATUS == "done"));
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
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ReceiptLongIcon fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70vw] h-[90vh]">
                {orders.length > 0 ? (
                    <OrderHistory orders={orders} setIsOpen={setIsOpen} />
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
