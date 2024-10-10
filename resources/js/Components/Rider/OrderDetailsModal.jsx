import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrderDetailsModal({ order }) {
    const [products, setProducts] = useState([]);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(
                    `/api/customer/carts/${order.order_id}`
                );
                setProducts(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [order.order_id]);

    useEffect(() => {
        const calculateSubtotal = () => {
            const total = products.reduce((acc, product) => {
                return acc + parseFloat(product.price) * product.quantity;
            }, 0);
            setSubtotal(total);
        };

        calculateSubtotal();
    }, [products]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(128, 128, 128, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                    }}
                >
                    <button
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            cursor: "pointer",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        View Details
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[50vw]">
                <section class="p-5 relative">
                    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                        <h2 class="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                            Order Summary
                        </h2>
                        <div class="hidden lg:grid grid-cols-2">
                            <div class="font-normal  leading-8 text-gray-500">
                                Product
                            </div>
                            <p class="font-normal  leading-8 text-gray-500 flex items-center justify-between">
                                <span class="w-full max-w-[260px] text-center">
                                    Quantity
                                </span>
                                <span class="w-full max-w-[200px] text-center">
                                    Price
                                </span>
                            </p>
                        </div>

                        <div className="w-full h-[20vh] overflow-y-auto overflow-x-hidden mb-10">
                            {products.length > 0
                                ? products.map((product) => (
                                      <div class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-3 border-t border-gray-200 py-6">
                                          <div class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-3 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                                              <div class="img-box">
                                                  <img
                                                      src={product.image.replace(
                                                          /\\\//g,
                                                          "/"
                                                      )}
                                                      alt="perfume bottle image"
                                                      className="xl:w-[70px] rounded-md shadow-md border-2 object-cover"
                                                  />
                                              </div>
                                              <div class="pro-data w-full max-w-sm ">
                                                  <h5 class="font-semibold   leading-8 text-black max-[550px]:text-center">
                                                      {product.PRODUCT_NAME}
                                                  </h5>
                                              </div>
                                          </div>
                                          <div class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2 ml-4">
                                              <h6 class="font-manrope font-bold  leading-9 text-black w-full max-w-[176px] text-center">
                                                  {product.quantity}
                                              </h6>
                                              <h6 class="text-indigo-600 ml-5 font-manrope font-bold  leading-9 w-full max-w-[176px] text-center">
                                                  {product.price}
                                              </h6>
                                          </div>
                                      </div>
                                  ))
                                : ""}
                        </div>

                        <div class="bg-gray-50 rounded-xl p-2 w-full  max-lg:max-w-xl max-lg:mx-auto">
                            <div class="flex items-center justify-between w-full">
                                <p class="font-normal   leading-8 text-gray-400">
                                    Sub Total
                                </p>
                                <h6 class="font-semibold  leading-8 text-gray-900">
                                    ₱{subtotal.toFixed(2)}
                                </h6>
                            </div>
                            <div class="flex items-center justify-between w-full  border-b border-gray-200">
                                <p class="font-normal text  leading-8 text-gray-400">
                                    Delivery Charge
                                </p>
                                <h6 class="font-semibold  leading-8 text-gray-900">
                                    ₱50.00
                                </h6>
                            </div>
                            <div class="flex items-center justify-between w-full">
                                <p class="font-manrope font-medium text-md leading-9 text-gray-900">
                                    Total
                                </p>
                                <h6 class="font-manrope font-medium text-md leading-9 text-indigo-500">
                                    ₱{(subtotal + 50).toFixed(2)}
                                </h6>
                            </div>
                        </div>
                        <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-2">
                            <button class="rounded-full px-7 py-1 flex items-center bg-main justify-center transition-all duration-500 hover:bg-indigo-100">
                                <span class="px-2 font-semibold  leading-8 text-white">
                                    Accept
                                </span>
                            </button>
                        </div>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
