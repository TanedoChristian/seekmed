import { Dialog, DialogContent, DialogTrigger } from "@/shadcdn/ui/dialog";
import { Input } from "@/shadcdn/ui/input";
import { Label } from "@/shadcdn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shadcdn/ui/radio-group";
import { FlagOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function CreateReportDialog({ order }) {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const {
        register,
        reset,
        handleSubmit,
        formState: { error, isLoading, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("REASON", data.reason);
        formData.append("QUANTITY", data.QUANTITY);
        formData.append("image", image);
        formData.append("ORDER_ID", order.order_id);
        formData.append("PRODUCT_ID", order.product_id);

        console.log(formData);

        const response = await axios.post("/api/return", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status == 200) {
            Swal.fire({
                title: "Success",
                icon: "success",
            });

            window.location.href = "/dashboard";
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="flex gap-2 items-center">
                    <button className="bg-red-500 text-white rounded-md px-8 py-2 flex items-center gap-2">
                        <FlagOutlined
                            className="text-white text-sm"
                            fontSize="inherit"
                        />
                        Return
                    </button>
                </span>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[70vw] h-[95vh] outline-none">
                <section class="py-5 relative">
                    <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 ">
                        <form
                            class="w-full flex-col justify-start items-end lg:gap-16 gap-12 inline-flex"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div class="w-full flex-col justify-start items-center gap-14 flex">
                                <div class="w-full flex-col justify-start items-start gap-3 flex">
                                    <h2 class="w-full text-center text-gray-900 text-3xl font-bold font-manrope leading-normal">
                                        Product Return Application
                                    </h2>
                                </div>
                                <div class="w-full flex-col justify-start items-start gap-2.5 flex">
                                    <h4 class="text-black text-xl font-semibold leading-8">
                                        Upload an Image
                                    </h4>
                                    <label
                                        for="dropzone-file"
                                        class="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 "
                                    >
                                        <div class="mb-3 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="40"
                                                height="40"
                                                viewBox="0 0 40 40"
                                                fill="none"
                                            >
                                                <g id="Upload 02">
                                                    <path
                                                        id="icon"
                                                        d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                                                        stroke="#4F46E5"
                                                        stroke-width="1.6"
                                                        stroke-linecap="round"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                        <span class="text-center text-gray-400 text-xs font-normal leading-4 mb-1">
                                            PNG, JPG or PDF, smaller than 15MB
                                        </span>
                                        <h6 class="text-center text-gray-900 text-sm font-medium leading-5">
                                            {image
                                                ? image.name
                                                : "Upload Product Image"}
                                        </h6>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            class="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <div class="w-full flex-col justify-start items-start gap-8 flex">
                                    <div class="w-full flex-col justify-start items-start gap-8 flex">
                                        <div class="w-full justify-start items-start lg:gap-8 gap-3.5 flex sm:flex-row flex-col">
                                            <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                                <h4 class="text-black text-xl font-semibold leading-8">
                                                    Write the reason
                                                </h4>
                                                <input
                                                    {...register("reason")}
                                                    type="text"
                                                    class="w-full h-12 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none px-4 py-2.5 rounded-lg  border border-gray-300 justify-start items-center gap-2 inline-flex text-gray-900 placeholder-gray-400 text-base font-normal leading-relaxed"
                                                    placeholder="Write here..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="w-full flex-col justify-start items-start gap-8 flex">
                                        <h4 class="text-black text-xl font-semibold leading-8">
                                            Quantity
                                        </h4>
                                        <div className="flex gap-3 items-center ">
                                            <input
                                                className="border p-3 rounded-md"
                                                type="number"
                                                id="option-one"
                                                {...register("QUANTITY")}
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-500">
                                                {error.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                class="sm:w-fit w-full px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                            >
                                <span class="px-2 text-white text-base font-semibold leading-7">
                                    Save Application
                                </span>
                            </button>
                        </form>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
