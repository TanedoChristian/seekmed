import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";
import { useState } from "react";
import Swal from "sweetalert2";

const ItemCard = ({
    item,
    type,
    img,
    price,
    stock,
    activeCarts,
    setActiveCarts,
}) => {
    const [product, setProduct] = useState({
        item: item,
        type: type,
        img: img,
        price: price,
        stock: stock,
        quantity: 0,
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleQuantity = (actionType) => {
        setProduct((prevProduct) => {
            let newQuantity = prevProduct.quantity;
            let newStock = prevProduct.stock;

            if (newQuantity < 0) {
                setIsOpen(false);
            }

            if (actionType === 0) {
                if (newQuantity > 0) {
                    newQuantity -= 1;
                    newStock += 1;
                }
            } else if (actionType === 1) {
                if (newStock > 0) {
                    newQuantity += 1;
                    newStock -= 1;
                }
            }

            return {
                ...prevProduct,
                quantity: newQuantity,
                stock: newStock,
            };
        });
    };

    const addToCart = () => {
        if (product.quantity > 0) {
            const existingCartItemIndex = activeCarts.findIndex(
                (cartItem) => cartItem.item === product.item
            );

            if (existingCartItemIndex !== -1) {
                setActiveCarts((prevCarts) => {
                    const updatedCarts = [...prevCarts];
                    updatedCarts[existingCartItemIndex].quantity +=
                        product.quantity;
                    return updatedCarts;
                });
            } else {
                const cartItem = {
                    item: product.item,
                    type: product.type,
                    img: product.img,
                    price: product.price,
                    quantity: product.quantity,
                };

                setActiveCarts((prevCarts) => [...prevCarts, cartItem]);
            }

            Swal.fire({
                title: "Added!",
                text: `${product.item} has been added to your cart.`,
                icon: "success",
            });

            setProduct((prevProduct) => ({
                ...prevProduct,
                quantity: 0,
            }));
        } else {
            Swal.fire({
                title: "Error!",
                text: "You must select at least one item.",
                icon: "error",
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
                    <span class="py-1 min-[400px]:py-2 px-2 min-[400px]:px-4 cursor-pointer rounded-lg bg-main from-indigo-600 to-purple-600 font-medium text-base leading-7 text-white absolute top-3 right-3 z-10 tex-sm">
                        {type == 0 ? "Retail" : "Wholesale"}
                    </span>

                    <div class="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-white">
                        <img
                            src={img}
                            alt="Product 1"
                            class="h-full w-full object-contain"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h3 class="text-lg  text-gray-800">{item}</h3>
                            <h4 class="text-lg text-gray-800 font-semibold mt-4">
                                ₱ {price}
                            </h4>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="text-center"></DialogHeader>
                <div class="w-full text-center text-black text-3xl font-bold font-manrope leading-normal">
                    Add to Cart
                </div>
                <div className="px-3 text-gray-500">{product.stock} left</div>
                <div className="p-2">
                    <div className="flex gap-3 justify-between px-2 mb-2 items-center">
                        <img
                            src={img}
                            alt=""
                            className="w-10 h-10 object-cover"
                        />
                        <div className="">
                            <h1 className="font-semibold text-md">{item}</h1>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button
                                className="outline-none font-semibold"
                                onClick={() => handleQuantity(0)}
                            >
                                -
                            </button>
                            <span className="outline-none">
                                {product.quantity}
                            </span>
                            <button
                                className="outline-none font-semibold"
                                onClick={() => handleQuantity(1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="">
                            <h1 className="font-semibold text-md">₱ {price}</h1>
                        </div>

                        <button
                            className="px-3 py-1 text-sm  text-red-500 font-semibold"
                            onClick={addToCart}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ItemCard;
