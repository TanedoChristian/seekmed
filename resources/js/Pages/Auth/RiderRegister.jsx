import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RiderRegister() {
    const { data, setData, post, processing, errors, reset } = useForm({
        FNAME: "",
        LNAME: "",
        EMAIL: "",
        password: "",
        CONTACTNO: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register-rider"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
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
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("FNAME", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.FNAME}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="name" value="Last Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("LNAME", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.LNAME}
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
                            value={data.EMAIL}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("EMAIL", e.target.value)}
                            required
                        />

                        <InputError message={errors.EMAIL} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Contact Number" />

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.contact_no}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("CONTACTNO", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.CONTACTNO}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
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
