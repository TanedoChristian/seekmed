import AddItemsModal from "./AddItemModal";
import {
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
import AddAdminModal from "./AddAdminModal";
import axios from "axios";

export default function CreateAdminTable({ initialAdmins }) {
    const [admins, setAdmins] = useState(initialAdmins);

    const [loading, setLoading] = useState(false);

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
                axios.delete(`/api/admin/${id}`).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted`,
                        icon: "success",
                    });
                    setAdmins((prev) =>
                        prev.filter((admin) => admin.id !== id)
                    );
                });
            }
        });
        window.location.reload();
    };

    const handleSearch = (e) => {
        const filtered = initialAdmins.filter((admin) => {
            return admin.EMAIL.toLowerCase().includes(
                e.target.value.toLowerCase()
            );
        });
        setAdmins(filtered);
    };

    return (
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[95%]">
            <div class="flex flex-col">
                <div className="flex gap-3 items-center ">
                    <div className="relative">
                        <Input
                            className="pl-10 pr-4 shadow-sm font-bold outline-none"
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="w-full flex justify-between  p-3 ">
                    <h1 className="text-3xl font-semibold">Admins</h1>
                    <AddAdminModal setAdmins={setAdmins} />
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
                                            Id
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-300 ">
                                    {admins
                                        ? admins.map((admin) => (
                                              <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                      {admin.id ?? ""}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {admin.EMAIL ?? ""}
                                                  </td>

                                                  <td class=" p-5 ">
                                                      <div class="flex items-center  gap-2 cursor-pointer">
                                                          <button
                                                              class="p-2 rounded-full  group transition-all duration-500  flex item-center"
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      admin.id
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
