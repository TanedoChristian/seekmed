import AdminSideNav from "@/Components/AdminSideNav";
import AdminTable from "@/Components/AdminTable";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { Input } from "@/shadcdn/ui/input";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useState } from "react";
import DeliveryRiderTable from "@/Components/DeliveryRiderTable";
import OrdersTable from "@/Components/OrdersTable";

export default function Admin({ auth, products, name, riders }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const [tableCategory, setTableCategory] = useState("inventory");

    return (
        <div>
            <nav className="bg-[#499392] border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                    <div className="flex justify-between h-16 items-center">
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

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <div className="ml-10 flex gap-2">
                                    <ManageAccountsIcon
                                        fontSize="medium"
                                        className="text-white"
                                    />
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
                            {/* <div className="font-medium text-base text-gray-800">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div> */}
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
            <div className="w-full flex">
                <div class="w-full flex gap-4">
                    <AdminSideNav
                        setTableCategory={setTableCategory}
                        category={tableCategory}
                    />

                    {tableCategory == "inventory" ? (
                        <div class="w-full flex justify-center py-10">
                            <AdminTable initialProducts={products} />
                        </div>
                    ) : tableCategory == "riders" ? (
                        <div class="w-full flex justify-center py-10">
                            <DeliveryRiderTable initialRiders={riders} />
                        </div>
                    ) : (
                        <div class="w-full flex justify-center py-10">
                            <OrdersTable riders={riders} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
