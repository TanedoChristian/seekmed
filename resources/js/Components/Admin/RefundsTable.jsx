import React, { useState } from "react";
import { Input } from "@/shadcdn/ui/input";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import Swal from "sweetalert2";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";

export default function RefundsTable({ returns }) {
    const [localReturns, setLocalReturns] = useState(returns);
    console.log(returns);

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
                axios.delete(`/api/returns/${id}`).then(() => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted`,
                        icon: "success",
                    });

                    setLocalReturns((prev) =>
                        prev.filter((returnItem) => returnItem.id !== id)
                    );
                });
            }
        });
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = returns.filter((returnItem) => {
            return (
                returnItem.order_id.toString().includes(searchValue) ||
                returnItem.reason.toLowerCase().includes(searchValue)
            );
        });
        setLocalReturns(filtered);
    };

    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[95%] mx-auto">
            <div className="flex flex-col">
                <div className="flex gap-3 items-center mb-4">
                    <div className="relative">
                        <Input
                            className="pl-10 pr-4 shadow-sm font-bold outline-none"
                            placeholder="Search..."
                            onChange={handleSearch}
                        />
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className="w-full flex justify-between p-3 mb-4">
                    <h1 className="text-3xl font-semibold">Return Request</h1>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full rounded-xl">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"
                                        >
                                            Order ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Reason
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Image
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            User Details
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {localReturns
                                        ? localReturns.map((returnItem) => (
                                              <tr
                                                  key={returnItem.id}
                                                  className="bg-white transition-all duration-500 hover:bg-gray-50"
                                              >
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {returnItem.ORDER_ID}
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {returnItem.REASON}
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {returnItem.QUANTITY}
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      <Dialog>
                                                          <DialogTrigger
                                                              asChild
                                                          >
                                                              <button className="text-sm bg-main text-white px-5 py-1 rounded-md">
                                                                  View
                                                              </button>
                                                          </DialogTrigger>
                                                          <DialogContent className="sm:max-w-[80vw]">
                                                              <DialogHeader className="text-center">
                                                                  <img
                                                                      src={
                                                                          returnItem.image
                                                                      }
                                                                  />
                                                              </DialogHeader>
                                                          </DialogContent>
                                                      </Dialog>
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      <Dialog>
                                                          <DialogTrigger
                                                              asChild
                                                          >
                                                              <button className="text-sm bg-main text-white px-5 py-1 rounded-md">
                                                                  View
                                                              </button>
                                                          </DialogTrigger>
                                                          <DialogContent className="sm:max-w-[50vw]">
                                                              <DialogHeader className="text-center">
                                                                  <div className="flex gap-10 items-center mb-15 p-5">
                                                                      <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                                                          <label
                                                                              for=""
                                                                              class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                                                          >
                                                                              Name
                                                                          </label>
                                                                          <input
                                                                              disabled
                                                                              value={`${returnItem.first_name} ${returnItem.last_name}`}
                                                                              type="text"
                                                                              class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                                          />
                                                                      </div>
                                                                      <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                                                          <label
                                                                              for=""
                                                                              class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                                                          >
                                                                              Email
                                                                          </label>
                                                                          <input
                                                                              value={
                                                                                  returnItem.email
                                                                              }
                                                                              disabled
                                                                              type="text"
                                                                              class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                                          />
                                                                      </div>
                                                                  </div>
                                                                  <div className="flex gap-10 items-center p-5">
                                                                      <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                                                          <label
                                                                              for=""
                                                                              class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                                                          >
                                                                              Address
                                                                          </label>
                                                                          <input
                                                                              value={
                                                                                  returnItem.USER_ADDRESS
                                                                              }
                                                                              disabled
                                                                              type="text"
                                                                              class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                                          />
                                                                      </div>
                                                                      <div class="w-full flex-col justify-start items-start gap-1.5 flex">
                                                                          <label
                                                                              for=""
                                                                              class="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                                                                          >
                                                                              Contact
                                                                              Number
                                                                          </label>
                                                                          <input
                                                                              value={
                                                                                  returnItem.USER_CONTACT
                                                                              }
                                                                              disabled
                                                                              type="text"
                                                                              class="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                                                          />
                                                                      </div>
                                                                  </div>
                                                              </DialogHeader>
                                                          </DialogContent>
                                                      </Dialog>
                                                  </td>
                                                  <td className="p-5">
                                                      <div className="flex items-center gap-2 cursor-pointer">
                                                          <button
                                                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      returnItem.id
                                                                  )
                                                              }
                                                          >
                                                              <TrashIcon />
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
