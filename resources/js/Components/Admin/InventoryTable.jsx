import AddItemsModal from "./AddItemModal";
import {
    CubeIcon,
    MagnifyingGlassIcon,
    Pencil1Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import AddRiderModal from "./AddRiderModal";
import { useState } from "react";
import UpdateDeliveryRiderModal from "../UpdateDeliveryRiderModal";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteDeliveryRider,
    fetchDeliveryRiders,
    setRiders,
} from "@/state/deliveryRiderSlice";
import { useEffect } from "react";
import { Input } from "@/shadcdn/ui/input";
import AddInventoryModal from "./AddInventoryModal";
import OrderStatus from "../OrderStatus";
import {
    BlockOutlined,
    CheckOutlined,
    MonetizationOn,
    MoneyOffCsredOutlined,
} from "@mui/icons-material";
import Reports from "./Reports";

export default function InventoryTable({
    initialInventories,
    orders,
    totalRevenuePerProduct,
    productsSoldPerMonth,
    totalReturnPerProduct,
}) {
    const cancelledOrders = () => {
        return orders.filter((order) => order.STATUS == "cancel").length;
    };

    const completedOrders = () => {
        return orders.filter((order) => order.STATUS == "done").length;
    };

    const totalRevenue = () => {
        const total = totalRevenuePerProduct.reduce((sum, product) => {
            return sum + parseFloat(product.total_price);
        }, 0);

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(total);
    };
    return (
        <div className="w-[95%] ">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-full mt-5">
                <div class="flex flex-col">
                    <div className="flex gap-3 items-center ">
                        <div className="relative">
                            <Input
                                className="pl-10 pr-4 shadow-sm font-bold outline-none"
                                placeholder="Search..."
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="w-full flex justify-between  p-3 ">
                        <h1 className="text-3xl font-semibold">Inventory</h1>
                        {/* <AddInventoryModal /> */}
                    </div>
                    <div class=" overflow-x-auto">
                        <div class="min-w-full inline-block align-middle">
                            <div class="overflow-hidden ">
                                <table class=" min-w-full rounded-xl">
                                    <thead>
                                        <tr class="bg-gray-50">
                                            <th
                                                scope="col"
                                                class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                            >
                                                Product ID
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                            >
                                                Quantity
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                            >
                                                Action
                                            </th>
                                            <th
                                                scope="col"
                                                class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-300 ">
                                        {initialInventories
                                            ? initialInventories.map(
                                                  (inventory) => (
                                                      <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                                          <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                              {inventory.id}
                                                          </td>
                                                          <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                              {
                                                                  inventory.PRODUCT_NAME
                                                              }
                                                          </td>
                                                          <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                              {
                                                                  inventory.QUANTITY_CHANGE
                                                              }
                                                          </td>
                                                          <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                              {
                                                                  inventory.CHANGE_TYPE
                                                              }
                                                          </td>
                                                          <td class=" p-5 ">
                                                              <div class="flex items-center  gap-2 cursor-pointer">
                                                                  <button class="p-1.5 px-5 rounded-sm  group transition-all duration-500  flex item-center bg-main text-white text-sm">
                                                                      View
                                                                  </button>

                                                                  <button class="p-1.5 px-5 text-sm rounded-sm  group transition-all duration-500  flex item-center bg-main text-white">
                                                                      Delete
                                                                  </button>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                  )
                                              )
                                            : ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-center">
                <OrderStatus
                    icon={<CubeIcon width={20} height={20} />}
                    number={orders.length}
                    title="Total Orders"
                    bgColor="bg-blue-100"
                    color="text-blue-600"
                />
                <OrderStatus
                    icon={<CheckOutlined width={20} height={20} />}
                    number={completedOrders()}
                    title="Completed Orders"
                    bgColor="bg-blue-100"
                    color="text-blue-600"
                />
                <OrderStatus
                    icon={<BlockOutlined />}
                    number={cancelledOrders()}
                    title="Cancelled Orders"
                    bgColor="bg-red-100"
                    color="text-red-500"
                />

                <OrderStatus
                    icon={<MonetizationOn />}
                    number={totalRevenue()}
                    title="Total Revenue"
                    bgColor="bg-green-100"
                    color="text-green-500"
                />
            </div>

            <div className="w-full mt-5 p-10 bg-main border rounded-lg shadow-md">
                <Reports
                    orders={orders}
                    totalRevenuePerProduct={totalRevenuePerProduct}
                    productsSoldPerMonth={productsSoldPerMonth}
                    totalReturnPerProduct={totalReturnPerProduct}
                />
            </div>
        </div>
    );
}
