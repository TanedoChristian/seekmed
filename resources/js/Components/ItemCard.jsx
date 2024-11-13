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
import { useState } from "react";
import Swal from "sweetalert2";
import ReviewList from "./Reivews/ReviewList";

const ItemCard = ({
    user,
    id,
    item,
    type,
    img,
    price,
    stock,
    description,
    activeCarts,
    setActiveCarts,
}) => {
    const [product, setProduct] = useState({
        id: id,
        item: item,
        type: type,
        img: img,
        description: description,
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
        setIsOpen(false);

        if (product.quantity > 0) {
            const existingCartItemIndex = activeCarts.findIndex(
                (cartItem) => cartItem.id === product.id
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
                    id: product.id,
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
                <div class="bg-main  cursor-pointer hover:-translate-y-2 transition-all relative border lg:max-w-[12vw] max-w-[50vw] rounded-sm ">
                    {stock == 0 ? (
                        <div className="absolute w-full bg-gray-400 h-full opacity-80 flex justify-center items-center">
                            <h1 className="font-bold text-2xl  shadow-xl">
                                Out of Stock
                            </h1>
                        </div>
                    ) : (
                        ""
                    )}

                    <span class="  px-2 min-[400px]:px-3 cursor-pointer rounded-sm bg-main  font-medium text-base leading-7 text-white absolute top-2 right-1 z-10 tex-sm">
                        {type == 0 ? "Retail" : "Wholesale"}
                    </span>

                    <div class="w-full  h-[170px] overflow-hidden mx-auto aspect-w-16 md:mb-2  bg-white">
                        <img
                            src={img}
                            alt="Product 1"
                            class="h-full w-full object-cover p-2"
                        />
                    </div>

                    <div className="p-3 mt-2">
                        <div className="flex items-center justify-between">
                            <h3 class="font-medium  text-white  text-xs">
                                {item}
                            </h3>
                            <h4 class=" text-white  font-medium text-xs">
                                ₱ {price}
                            </h4>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50vw]">
                <DialogHeader className="text-center"></DialogHeader>
                <div className="relative">
                    {/* <div className="absolute bg-gray-500 w-full h-full z-10 flex justify-center items-center opacity-50">
                        <h1 className="font-bold text-xl text-black">
                            Out of Stock
                        </h1>
                    </div> */}
                    <section class="flex ">
                        <div class="w-full mx-auto px-4 sm:px-6 lg:px-0">
                            <div class="flex gap-10 ">
                                <div class="img">
                                    <div class="img-box  max-lg:mx-auto h-[350px]">
                                        <img
                                            src={product.img}
                                            alt="Yellow Tropical Printed Shirt image"
                                            class="max-lg:mx-auto lg:ml-auto h-full object-cover w-[450px] "
                                        />
                                    </div>
                                </div>
                                <div class="data w-full lg:pr-8 pr-0 xl:justify-start j flex  max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                                    <div class="data w-full max-w-xl">
                                        <h2 class="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">
                                            {product.item}
                                        </h2>
                                        <div class="flex flex-col sm:flex-row sm:items-center mb-6">
                                            <h6 class="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                                {product.price}
                                            </h6>
                                            <div class="flex items-center gap-2">
                                                <div class="flex items-center gap-1">
                                                    <p>
                                                        {product.stock} left
                                                        items
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="text-gray-500 text-base font-normal mb-5">
                                            {product.description}
                                        </p>

                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                                            <div class="flex sm:items-center sm:justify-center w-full">
                                                <button
                                                    class="group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300"
                                                    onClick={() =>
                                                        handleQuantity(0)
                                                    }
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
                                                    value={product.quantity}
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
                                            <button
                                                class="group py-4 px-5 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-lg w-full flex items-center justify-center gap-2 transition-all duration-500 hover:bg-indigo-100"
                                                onClick={addToCart}
                                            >
                                                <ShoppingCart />
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reviews */}
                    <ReviewList productId={product.id} user={user} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ItemCard;
