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
            <DialogContent className="sm:max-w-[50vw]">
                <DialogHeader className="text-center"></DialogHeader>
                <div>
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
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clip-path="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clip-path="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clip-path="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clip-path="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clip-path="url(#clip0_8480_66029)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#F3F4F6"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_8480_66029">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span class="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                                                    1624 review
                                                </span>
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
                    <ReviewList />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ItemCard;
