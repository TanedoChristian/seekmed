import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";
import { Label } from "@/shadcdn/ui/label";
import { RadioGroupItem, RadioGroup } from "@/shadcdn/ui/radio-group";
import { setDashboardCategory, setOrderAccepted } from "@/state/userSlice";
import { RemoveCircle, ShoppingCart } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { useState } from "react";

import axios from "axios";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { Controller, useForm } from "react-hook-form";

export default function CheckoutDialog({ activeCarts, setActiveCarts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const { register, handleSubmit, reset, setValue, control } = useForm();

    const dispatch = useDispatch();

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

    const postActiveCarts = (data) => {
        activeCarts.map((active) => {
            console.log(active.id);
            axios.post("/api/carts", active).then((data) => {
                console.log(data);
            });
        });
        axios.post("/api/orders", data).then(() => {
            Swal.fire({
                title: "Added!",
                text: `Successfully checkout your order.`,
                icon: "success",
            });

            dispatch(setOrderAccepted(1));
            setIsOpen(false);
            setActiveCarts([]);
        });
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        if (value) {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search`,
                    {
                        params: {
                            q: value,
                            format: "json",
                            addressdetails: 1,
                            limit: 5,
                        },
                    }
                );
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching location data:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (location) => {
        setValue("address", location.display_name);
        setSuggestions([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ShoppingCart fontSize="medium" className="text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70vw] h-[90vh]">
                <section class="  after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 ">
                    <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                        <div class="flex">
                            <div class="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-2 w-full max-xl:max-w-3xl max-xl:mx-auto">
                                <div class="flex items-center justify-between pb-8 border-b border-gray-300">
                                    <h2 class="font-manrope font-bold text-3xl leading-10 text-black">
                                        Shopping Cart
                                    </h2>
                                </div>
                                <div class="grid grid-cols-12 mt-3 max-md:hidden pb-6 border-b border-gray-200">
                                    <div class="col-span-12 md:col-span-7">
                                        <p class="font-normal text-lg leading-8 text-gray-400">
                                            Product Details
                                        </p>
                                    </div>
                                    <div class="col-span-12 md:col-span-5">
                                        <div class="grid grid-cols-5">
                                            <div class="col-span-3">
                                                <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    Quantity
                                                </p>
                                            </div>
                                            <div class="col-span-2">
                                                <p class="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    Total
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[600px]  overflow-auto flex flex-col gap-2">
                                    {activeCarts.length > 0
                                        ? activeCarts.map((cart, index) => (
                                              <div class="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-2 py-3  border-b border-gray-200 group">
                                                  <div class="w-full md:max-w-[90px]">
                                                      <img
                                                          src={cart.img}
                                                          alt="perfume bottle image"
                                                          class="mx-auto rounded-xl object-cover"
                                                      />
                                                  </div>
                                                  <div class="grid grid-cols-1 md:grid-cols-4 w-full">
                                                      <div class="md:col-span-2">
                                                          <div class="flex flex-col max-[500px]:items-center">
                                                              <h6 class="font-semibold text-base leading-7 text-black">
                                                                  {cart.item}
                                                              </h6>

                                                              <h6 class="font-medium text-base leading-7 text-gray-600 transition-all duration-300 ">
                                                                  {cart.price}
                                                              </h6>
                                                          </div>
                                                      </div>
                                                      <div class="flex items-center max-[500px]:justify-center h-full max-md:mt-3 ml-20">
                                                          <div class="flex items-center h-full">
                                                              <p className="text-lg font-bold">
                                                                  x{" "}
                                                                  {
                                                                      cart.quantity
                                                                  }
                                                              </p>
                                                          </div>
                                                      </div>
                                                      <div class="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full mr-5">
                                                          <p
                                                              class="font-bold text-lg leading-8 text-red-600 text-center transition-all duration-300 cursor-pointer"
                                                              onClick={() => {
                                                                  removeFromCart(
                                                                      index
                                                                  );
                                                              }}
                                                          >
                                                              Remove
                                                          </p>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))
                                        : "Empty Cart"}
                                </div>
                            </div>
                            <div class=" col-span-12 xl:col-span-4  w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-2">
                                <h2 class="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                                    Order Summary
                                </h2>
                                <div class="mt-8">
                                    <div className="border rounded-md p-3 tracking-wide">
                                        <div className="flex justify-between  text-gray-600">
                                            <p>Subtotal: </p>
                                            <p className="font-semibold text-black">
                                                P {subtotal}
                                            </p>
                                        </div>
                                        <div className="flex justify-between  text-gray-600 mt-3">
                                            <p>Delivery: </p>
                                            <p className="font-semibold text-black">
                                                P 50.00
                                            </p>
                                        </div>
                                        <Divider />
                                        <div className="flex justify-between  text-gray-600 mt-3">
                                            <p>Total: </p>
                                            <p className="font-semibold text-black">
                                                P {subtotal + 50.0}
                                            </p>
                                        </div>
                                    </div>

                                    <form
                                        className="mt-8 tracking-wide"
                                        onSubmit={handleSubmit(postActiveCarts)}
                                    >
                                        <label class="flex  items-center mb-1.5 text-gray-600 font-semibold ">
                                            Address
                                        </label>
                                        <div class="pb-6">
                                            {suggestions.length > 0 && (
                                                <ul className="flex flex-col h-[15vh] overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg w-full text-sm">
                                                    {suggestions.map(
                                                        (location) => (
                                                            <li
                                                                key={
                                                                    location.place_id
                                                                }
                                                                onClick={() =>
                                                                    handleSuggestionClick(
                                                                        location
                                                                    )
                                                                }
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                            >
                                                                {
                                                                    location.display_name
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                            <input
                                                {...register("address")}
                                                onChange={handleInputChange}
                                                type="text"
                                                class="w-full focus:outline-none text-gray-900 relative placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                placeholder="John"
                                            />
                                        </div>
                                        <label class="flex items-center mt-3 text-gray-400 text-sm font-medium">
                                            Payment Method
                                        </label>
                                        <div class="flex pb-4 w-full">
                                            <Controller
                                                name="PAYMENT_METHOD"
                                                control={control}
                                                render={({ field }) => (
                                                    <div className="flex flex-col space-y-2">
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                value="COD"
                                                                checked={
                                                                    field.value ===
                                                                    "COD"
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                className="mr-2"
                                                            />
                                                            COD
                                                        </label>
                                                        <label className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                value="GCASH"
                                                                checked={
                                                                    field.value ===
                                                                    "GCASH"
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                className="mr-2"
                                                            />
                                                            GCash
                                                        </label>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <label class="flex mt-3  items-center mb-1.5 text-gray-600 font-semibold ">
                                            Contact Number
                                        </label>
                                        <div class="flex pb-6">
                                            <div class=" w-full">
                                                <input
                                                    {...register(
                                                        "contact_number"
                                                    )}
                                                    type="text"
                                                    class="w-full focus:outline-none text-sm text-gray-900 relative placeholder-gray-400  font-normal leading-relaxed px-5 py-2 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                    placeholder="John"
                                                />
                                            </div>
                                        </div>

                                        <div class="flex items-center justify-between py-8">
                                            <p class="font-medium text-xl leading-8 text-black">
                                                3 Items
                                            </p>
                                            <p class="font-semibold text-xl leading-8 text-indigo-600"></p>
                                        </div>
                                        <button
                                            class="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                                            type="submit"
                                        >
                                            Checkout
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
