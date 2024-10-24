import axios from "axios";
import AddItemsModal from "./AddItemModal";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Swal from "sweetalert2";

export default function OrdersTable({ orders }) {
    const updateOrderStatus = async (order, status) => {
        order.STATUS = status;
        const response = await axios.put("/api/orders/update", order);

        if (response.status == 200) {
            Swal.fire({
                title: `Status updated to ${status}`,
                icon: "success",
            });
        }
    };

    return (
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[80%]">
            <div class="flex flex-col">
                <div className="w-full flex justify-between  p-3 ">
                    <h1 className="text-3xl font-semibold">Orders</h1>
                    <AddItemsModal />
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
                                            User ID
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                        >
                                            Payment Method
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-300 ">
                                    {orders
                                        ? orders.map((order) => (
                                              <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                      {order.USER_ID}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 capitalize">
                                                      {order.STATUS}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {order.address}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {order.PAYMENT_METHOD}
                                                  </td>
                                                  <td class=" p-5 ">
                                                      {order.STATUS ==
                                                      "PENDING" ? (
                                                          <div class="flex items-center gap-2">
                                                              <button
                                                                  class="p-2 rounded-md  group transition-all duration-500  flex item-center bg-main text-white"
                                                                  onClick={() => {
                                                                      updateOrderStatus(
                                                                          order,
                                                                          "Ready"
                                                                      );
                                                                  }}
                                                              >
                                                                  Accept
                                                              </button>
                                                              <button
                                                                  class="p-2 rounded-md  group transition-all duration-500  flex item-center bg-red-500 text-white"
                                                                  onClick={() => {
                                                                      updateOrderStatus(
                                                                          order,
                                                                          "Reject"
                                                                      );
                                                                  }}
                                                              >
                                                                  Reject
                                                              </button>
                                                          </div>
                                                      ) : (
                                                          ""
                                                      )}
                                                  </td>
                                              </tr>
                                          ))
                                        : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
