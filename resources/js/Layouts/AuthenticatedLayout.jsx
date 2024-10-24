import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { Separator } from "@/shadcdn/ui/separator";
import { Input } from "@/shadcdn/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcdn/ui/popover";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChatIcon from "@mui/icons-material/Chat";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import OrderDialog from "@/Components/OrderDialog";
import { useDispatch } from "react-redux";
import { setDashboardCategory } from "@/state/userSlice";
import CheckoutDialog from "@/Components/CheckoutDialog";

export default function Authenticated({
    user,
    header,
    children,
    open,
    setIsOpen,
    activeCarts,
    setActiveCarts,
    setDashboardPage,
}) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const dispatch = useDispatch();

    return (
        <div className="min-h-screen bg-gray-100 w-full">
            <nav className="bg-[#499392] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link
                                    onClick={() => {
                                        dispatch(setDashboardCategory(0));
                                    }}
                                >
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

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <CheckoutDialog
                                    open={open}
                                    setIsOpen={setIsOpen}
                                    activeCarts={activeCarts}
                                    setActiveCarts={setActiveCarts}
                                    title="Checkout"
                                    imgSrc="https://atchealthcare.com.ph/wp-content/uploads/2020/03/Robust-Extreme-.png"
                                    itemName="Centeral Catheter Kit"
                                    itemCost="7,500.00"
                                    quantity={5}
                                    setDashboardPage={setDashboardPage}
                                />

                                <ChatIcon
                                    fontSize="medium"
                                    className="text-white"
                                    onClick={() => {
                                        dispatch(setDashboardCategory(3));
                                    }}
                                />

                                <OrderDialog user={user} />

                                <MyLocationIcon
                                    fontSize="medium"
                                    className="text-white"
                                />

                                <div className="ml-10 flex gap-2">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <NotificationsIcon
                                                fontSize="medium"
                                                className="text-white"
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">
                                                        Orders
                                                    </h4>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <ManageAccountsIcon
                                                fontSize="medium"
                                                className="text-white"
                                            />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-30">
                                            <button
                                                onClick={() => {
                                                    dispatch(
                                                        setDashboardCategory(1)
                                                    );
                                                }}
                                            >
                                                Edit Profile
                                            </button>
                                            <ResponsiveNavLink
                                                method="post"
                                                href={route("logout")}
                                                as="button"
                                            >
                                                Log Out
                                            </ResponsiveNavLink>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
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
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
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

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="w-full">{children}</main>
        </div>
    );
}
