import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";

export default function EditProfile({ user }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [suggestions, setSuggestions] = useState([]);

    const onSubmit = async (data) => {
        console.log(data);
        axios
            .put(`/api/users/${user.id}`, data)
            .then(({ data }) => {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                });
            })
            .catch((err) => {
                console.log(err);
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

                console.log(response.data);

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
        <section class="py-24 relative">
            <form
                class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div class="w-full flex-col justify-center items-center gap-4 inline-flex">
                    <h2 class="text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
                        Edit Profile
                    </h2>
                </div>
                <div class="">
                    <div class="w-full flex-col justify-center items-start gap-6 inline-flex">
                        <h4 class="text-gray-900 text-xl font-semibold leading-8">
                            Basic Information
                        </h4>
                        <div class="w-full flex-col justify-start items-start gap-8 flex">
                            <div class="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
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
                                        {...register("first_name")}
                                        defaultValue={user.first_name}
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
                                        placeholder="Smith"
                                        {...register("last_name")}
                                        defaultValue={user.last_name}
                                    />
                                </div>
                            </div>

                            <div class="w-full justify-start items-start gap-7 flex sm:flex-row flex-col">
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
                                        {...register("email")}
                                        defaultValue={user.email}
                                        type="text"
                                        class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                        placeholder="John"
                                    />
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
                                        {...register("contact_no")}
                                        type="text"
                                        class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                        placeholder="Smith"
                                        defaultValue={user.contact_no}
                                    />
                                </div>
                            </div>

                            <div class="w-full flex-col justify-start items-start gap-6 inline-flex">
                                <h4 class="text-gray-900 text-xl font-semibold leading-8">
                                    Address Informatiom
                                </h4>
                                <div class="w-full flex-col justify-start items-start gap-8 flex">
                                    <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                        <label
                                            for=""
                                            class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                        >
                                            Address
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

                                        {suggestions.length > 0 && (
                                            <ul className="flex flex-col h-[15vh] overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg w-full">
                                                {suggestions.map((location) => (
                                                    <li
                                                        key={location.place_id}
                                                        onClick={() =>
                                                            handleSuggestionClick(
                                                                location
                                                            )
                                                        }
                                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {location.display_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <input
                                            {...register("address")}
                                            onChange={handleInputChange}
                                            type="text"
                                            class="w-full focus:outline-none text-gray-900 relative placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                            placeholder="John"
                                            defaultValue={user.address}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="mx-auto sm:w-fit w-full px-7 py-3 mt-5 bg-main transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                    type="submit"
                >
                    <span class="px-10 text-center text-white text-lg font-semibold leading-8">
                        Edit
                    </span>
                </button>
            </form>
        </section>
    );
}
