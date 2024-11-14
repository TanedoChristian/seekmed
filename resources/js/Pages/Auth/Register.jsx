import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        address: "",
        contact_no: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [suggestions, setSuggestions] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        post(route("register.post"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setData("address", value);
        if (value) {
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search`,
                    {
                        params: {
                            q: value,
                            format: "json",
                            addressdetails: 1,
                            countrycodes: "PH",
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
        setData("address", location.display_name);
        setSuggestions([]);
    };

    return (
        <div className="w-full h-[100vh] flex">
            <div className="w-[25%] h-full p-10 flex justify-center flex-col gap-16">
                <h1 className="text-5xl font-bold text-center">Register</h1>
                <form onSubmit={submit}>
                    <div className="flex gap-3">
                        <div>
                            <InputLabel htmlFor="name" value="First Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.first_name}
                                className="mt-1 block w-full border p-2"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.first_name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Last Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.last_name}
                                className="mt-1 block w-full border p-2"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.last_name}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full border p-2"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Contact Number" />

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.contact_no}
                            className="mt-1 block w-full border p-2"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("contact_no", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.contact_no}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Address" />
                        {suggestions.length > 0 && (
                            <ul className="flex flex-col h-[15vh] overflow-auto bg-white border border-gray-200 rounded-lg shadow-lg w-full text-sm">
                                {suggestions.map((location) => (
                                    <li
                                        key={location.place_id}
                                        onClick={() =>
                                            handleSuggestionClick(location)
                                        }
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {location.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            className="mt-1 block w-full border p-2"
                            autoComplete="username"
                            value={data.address}
                            onChange={handleInputChange}
                            required
                        />

                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password "
                            value={data.password}
                            className="mt-1 block w-full border p-2"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full border p-2"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <div className="w-[75%] bg-main flex">
                <img
                    src="https://www.singlecare.com/blog/wp-content/uploads/2021/01/Pharmacy-Delivery.png"
                    className="object-cover"
                />
            </div>
        </div>
    );
}
