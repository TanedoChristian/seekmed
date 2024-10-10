import MapRealtime from "@/Components/Location/MapRealtime";
import MessageBox from "@/Components/MessageBox";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Order from "@/Components/Rider/Order";
import { Input } from "@/shadcdn/ui/input";
import { Link } from "@inertiajs/react";
import { Message } from "@mui/icons-material";
import { useState } from "react";

export default function Dashboard({ orders }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [category, setTableCategory] = useState("orders");

    const handleLogout = () => {};

    return (
        <div>
            <nav className="bg-[#499392] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex gap-[300px] h-16 items-center">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <h1 className="text-3xl font-extrabold text-white">
                                        SEEKMED
                                    </h1>
                                </Link>
                            </div>
                        </div>

                        <div className="w-[40%] flex flex-col gap-3">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className="bg-white text-black"
                            />
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul class="flex gap-3">
                                <li
                                    onClick={() => setTableCategory("orders")}
                                    className="cursor-pointer"
                                >
                                    <a>
                                        <div class="flex-col gap-1 flex">
                                            <div
                                                class={`flex-col flex p-3  rounded-lg ${
                                                    category == "orders"
                                                        ? "bg-gray-200"
                                                        : "bg-white"
                                                }`}
                                            >
                                                <div class="h-5 gap-3 flex">
                                                    <div class="relative">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <g id="Delivery">
                                                                <path
                                                                    id="icon"
                                                                    d="M17.5 13.3334H9.16667C6.80964 13.3334 5.63113 13.3334 4.8989 12.6011C4.16667 11.8689 4.16667 10.6904 4.16667 8.33337V5.00004C4.16667 4.07957 3.42047 3.33337 2.5 3.33337M8.33333 17.0834C8.33333 17.7737 7.77369 18.3334 7.08333 18.3334C6.39298 18.3334 5.83333 17.7737 5.83333 17.0834C5.83333 16.393 6.39298 15.8334 7.08333 15.8334C7.77369 15.8334 8.33333 16.393 8.33333 17.0834ZM15 17.0834C15 17.7737 14.4404 18.3334 13.75 18.3334C13.0596 18.3334 12.5 17.7737 12.5 17.0834C12.5 16.393 13.0596 15.8334 13.75 15.8334C14.4404 15.8334 15 16.393 15 17.0834ZM10.4167 10H13.75C14.9204 10 15.5056 10 15.926 9.71916C16.1079 9.59756 16.2642 9.44131 16.3858 9.25932C16.6667 8.83895 16.6667 8.25376 16.6667 7.08337C16.6667 5.91299 16.6667 5.3278 16.3858 4.90742C16.2642 4.72544 16.1079 4.56919 15.926 4.44759C15.5056 4.16671 14.9204 4.16671 13.75 4.16671H10.4167C9.24628 4.16671 8.66109 4.16671 8.24072 4.44759C8.05873 4.56919 7.90248 4.72544 7.78088 4.90742C7.5 5.3278 7.5 5.91299 7.5 7.08337C7.5 8.25376 7.5 8.83895 7.78088 9.25932C7.90248 9.44131 8.05873 9.59756 8.24072 9.71916C8.66109 10 9.24628 10 10.4167 10Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                    stroke-linecap="round"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <h2 class="text-gray-500 text-sm font-medium leading-snug">
                                                        Orders
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li
                                    onClick={() => setTableCategory("chat")}
                                    className="cursor-pointer"
                                >
                                    <a>
                                        <div
                                            class={`flex-col flex p-3  rounded-lg ${
                                                category == "chat"
                                                    ? "bg-gray-200"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <div class="h-5 gap-3 flex">
                                                <div class="relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                    >
                                                        <g id="category 02">
                                                            <g id="icon">
                                                                <path
                                                                    d="M2.5 5.41667C2.5 3.80584 3.80584 2.5 5.41667 2.5C7.0275 2.5 8.33333 3.80584 8.33333 5.41667C8.33333 7.0275 7.0275 8.33333 5.41667 8.33333C3.80584 8.33333 2.5 7.0275 2.5 5.41667Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M11.6667 5.41667C11.6667 4.24628 11.6667 3.66109 11.9476 3.24072C12.0691 3.05873 12.2254 2.90248 12.4074 2.78088C12.8278 2.5 13.4129 2.5 14.5833 2.5C15.7537 2.5 16.3389 2.5 16.7593 2.78088C16.9413 2.90248 17.0975 3.05873 17.2191 3.24072C17.5 3.66109 17.5 4.24628 17.5 5.41667C17.5 6.58705 17.5 7.17224 17.2191 7.59262C17.0975 7.7746 16.9413 7.93085 16.7593 8.05245C16.3389 8.33333 15.7537 8.33333 14.5833 8.33333C13.4129 8.33333 12.8278 8.33333 12.4074 8.05245C12.2254 7.93085 12.0691 7.7746 11.9476 7.59262C11.6667 7.17224 11.6667 6.58705 11.6667 5.41667Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M11.6667 14.5833C11.6667 12.9725 12.9725 11.6667 14.5833 11.6667C16.1942 11.6667 17.5 12.9725 17.5 14.5833C17.5 16.1942 16.1942 17.5 14.5833 17.5C12.9725 17.5 11.6667 16.1942 11.6667 14.5833Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M2.5 14.5833C2.5 13.4129 2.5 12.8278 2.78088 12.4074C2.90248 12.2254 3.05873 12.0691 3.24072 11.9476C3.66109 11.6667 4.24628 11.6667 5.41667 11.6667C6.58705 11.6667 7.17224 11.6667 7.59262 11.9476C7.7746 12.0691 7.93085 12.2254 8.05245 12.4074C8.33333 12.8278 8.33333 13.4129 8.33333 14.5833C8.33333 15.7537 8.33333 16.3389 8.05245 16.7593C7.93085 16.9413 7.7746 17.0975 7.59262 17.2191C7.17224 17.5 6.58705 17.5 5.41667 17.5C4.24628 17.5 3.66109 17.5 3.24072 17.2191C3.05873 17.0975 2.90248 16.9413 2.78088 16.7593C2.5 16.3389 2.5 15.7537 2.5 14.5833Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <h2 class="text-gray-500 text-sm font-medium leading-snug">
                                                    Chats
                                                </h2>
                                            </div>
                                        </div>
                                    </a>
                                </li>

                                <li className="cursor-pointer">
                                    <a href={route("logout.rider")}>
                                        <div
                                            class={`flex-col flex p-3  rounded-lg bg-white`}
                                        >
                                            <div class="h-5 gap-3 flex">
                                                <div class="relative">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                    >
                                                        <g id="category 02">
                                                            <g id="icon">
                                                                <path
                                                                    d="M2.5 5.41667C2.5 3.80584 3.80584 2.5 5.41667 2.5C7.0275 2.5 8.33333 3.80584 8.33333 5.41667C8.33333 7.0275 7.0275 8.33333 5.41667 8.33333C3.80584 8.33333 2.5 7.0275 2.5 5.41667Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M11.6667 5.41667C11.6667 4.24628 11.6667 3.66109 11.9476 3.24072C12.0691 3.05873 12.2254 2.90248 12.4074 2.78088C12.8278 2.5 13.4129 2.5 14.5833 2.5C15.7537 2.5 16.3389 2.5 16.7593 2.78088C16.9413 2.90248 17.0975 3.05873 17.2191 3.24072C17.5 3.66109 17.5 4.24628 17.5 5.41667C17.5 6.58705 17.5 7.17224 17.2191 7.59262C17.0975 7.7746 16.9413 7.93085 16.7593 8.05245C16.3389 8.33333 15.7537 8.33333 14.5833 8.33333C13.4129 8.33333 12.8278 8.33333 12.4074 8.05245C12.2254 7.93085 12.0691 7.7746 11.9476 7.59262C11.6667 7.17224 11.6667 6.58705 11.6667 5.41667Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M11.6667 14.5833C11.6667 12.9725 12.9725 11.6667 14.5833 11.6667C16.1942 11.6667 17.5 12.9725 17.5 14.5833C17.5 16.1942 16.1942 17.5 14.5833 17.5C12.9725 17.5 11.6667 16.1942 11.6667 14.5833Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                                <path
                                                                    d="M2.5 14.5833C2.5 13.4129 2.5 12.8278 2.78088 12.4074C2.90248 12.2254 3.05873 12.0691 3.24072 11.9476C3.66109 11.6667 4.24628 11.6667 5.41667 11.6667C6.58705 11.6667 7.17224 11.6667 7.59262 11.9476C7.7746 12.0691 7.93085 12.2254 8.05245 12.4074C8.33333 12.8278 8.33333 13.4129 8.33333 14.5833C8.33333 15.7537 8.33333 16.3389 8.05245 16.7593C7.93085 16.9413 7.7746 17.0975 7.59262 17.2191C7.17224 17.5 6.58705 17.5 5.41667 17.5C4.24628 17.5 3.66109 17.5 3.24072 17.2191C3.05873 17.0975 2.90248 16.9413 2.78088 16.7593C2.5 16.3389 2.5 15.7537 2.5 14.5833Z"
                                                                    stroke="#6B7280"
                                                                    stroke-width="1.6"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <h2 class="text-gray-500 text-sm font-medium leading-snug">
                                                    Logout
                                                </h2>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">
                                Cj
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                test email
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            {category == "chat" ? (
                <MessageBox />
            ) : (
                <Order orders={orders} setTableCategory={setTableCategory} />
            )}
        </div>
    );
}
