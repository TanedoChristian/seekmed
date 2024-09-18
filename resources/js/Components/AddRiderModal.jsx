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
import axios from "axios";
import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddRiderModal({ setRiders }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isLoading, isSubmitting },
    } = useForm();

    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (data) => {
        try {
            await axios.post("/api/rider", data).then(({ data }) => {
                setRiders((prevRiders) => [...prevRiders, data]);
                setIsOpen(false);
                reset();
            });
        } catch (error) {
            console.error("Error adding rider:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-main text-white">+ Add More Rider</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px]">
                <DialogHeader className="text-center"></DialogHeader>
                <section class="">
                    <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                        <form
                            class="w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div class="w-full flex-col justify-start items-start gap-6 flex">
                                <h4 class="text-gray-900 text-xl font-semibold leading-loose">
                                    Add Rider
                                </h4>
                                <div class="w-full flex-col justify-start items-start gap-8 flex">
                                    <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <label
                                                for=""
                                                class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                            >
                                                First Name
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="7"
                                                    height="7"
                                                    viewBox="0 0 7 7"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                                                        fill="#EF4444"
                                                    />
                                                </svg>
                                            </label>
                                            <input
                                                {...register("FNAME", {
                                                    required:
                                                        "First Name is required",
                                                })}
                                                type="text"
                                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            />
                                        </div>

                                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <label
                                                for=""
                                                class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                            >
                                                Last Name
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="7"
                                                    height="7"
                                                    viewBox="0 0 7 7"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                                                        fill="#EF4444"
                                                    />
                                                </svg>
                                            </label>
                                            <input
                                                type="text"
                                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                {...register("LNAME", {
                                                    required:
                                                        "Last Name is required",
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <label
                                                for=""
                                                class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                            >
                                                Email
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="7"
                                                    height="7"
                                                    viewBox="0 0 7 7"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                                                        fill="#EF4444"
                                                    />
                                                </svg>
                                            </label>
                                            <input
                                                type="text"
                                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                {...register("EMAIL", {
                                                    required:
                                                        "Email is required",
                                                })}
                                            />
                                        </div>
                                        <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                            <label
                                                for=""
                                                class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                            >
                                                Password
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="7"
                                                    height="7"
                                                    viewBox="0 0 7 7"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                                                        fill="#EF4444"
                                                    />
                                                </svg>
                                            </label>
                                            <input
                                                type="password"
                                                class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                {...register("PASSWORD", {
                                                    required:
                                                        "password is required",
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            for=""
                                            class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                            Contact Number
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="7"
                                                height="7"
                                                viewBox="0 0 7 7"
                                                fill="none"
                                            >
                                                <path
                                                    d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                                                    fill="#EF4444"
                                                />
                                            </svg>
                                        </label>
                                        <input
                                            type="text"
                                            class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            {...register("CONTACTNO", {
                                                required:
                                                    "Contact Number is required",
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                class="mx-auto sm:w-fit w-full px-9 py-3 bg-main hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <span class="px-3.5 text-center text-white text-lg font-semibold leading-8">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </span>
                            </button>
                        </form>
                    </div>
                </section>
            </DialogContent>
        </Dialog>
    );
}
