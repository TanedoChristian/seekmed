import AddItemsModal from "./AddItemModal";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AddRiderModal from "./AddRiderModal";
import { useState } from "react";
import UpdateDeliveryRiderModal from "../UpdateDeliveryRiderModal";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteDeliveryRider,
    fetchDeliveryRiders,
} from "@/state/deliveryRiderSlice";
import { useEffect } from "react";

export default function DeliveryRiderTable({ initialRiders }) {
    const [riders, setRiders] = useState(initialRiders);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const tempRiders = useSelector((state) => state.deliveryRider.riders);

    useEffect(() => {
        dispatch(fetchDeliveryRiders());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteDeliveryRider(id)).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted`,
                        icon: "success",
                    });
                    dispatch(fetchDeliveryRiders());
                });
            }
        });
    };

    return (
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[80%]">
            <div class="flex flex-col">
                <div className="w-full flex justify-between  p-3 ">
                    <h1 className="text-3xl font-semibold">Delivery Riders</h1>
                    <AddRiderModal />
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
                                            First Name
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Last Name
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Email
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
                                    {tempRiders
                                        ? tempRiders.map((rider) => (
                                              <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                      {rider.FNAME ?? ""}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {rider.LNAME ?? ""}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {rider.EMAIL ?? ""}
                                                  </td>
                                                  <td class=" p-5 ">
                                                      <div class="flex items-center  gap-2 cursor-pointer">
                                                          <UpdateDeliveryRiderModal
                                                              rider={rider}
                                                          />
                                                          <button
                                                              class="p-2 rounded-full  group transition-all duration-500  flex item-center"
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      rider.id
                                                                  )
                                                              }
                                                          >
                                                              {loading ? (
                                                                  <CircularProgress
                                                                      size={10}
                                                                  />
                                                              ) : (
                                                                  <TrashIcon />
                                                              )}
                                                          </button>
                                                      </div>
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