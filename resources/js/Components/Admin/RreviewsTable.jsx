import React, { useState } from "react";
import { Input } from "@/shadcdn/ui/input";
import { MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import Swal from "sweetalert2";
import axios from "axios";

export default function ReviewsTable({ reviews }) {
    const [localReviews, setLocalReviews] = useState(reviews);
    console.log(reviews);

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
                axios.delete(`/api/reviews/${id}`).then((data) => {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Successfully deleted`,
                        icon: "success",
                    });

                    setLocalReviews((prev) =>
                        prev.filter((review) => review.id != id)
                    );
                });
            }
        });
    };

    const handleSearch = (e) => {
        const filtered = reviews.filter((review) => {
            return (
                review.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                review.RATING == e.target.value
            );
        });
        setLocalReviews(filtered);
    };

    return (
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[80%] mx-auto">
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
                    <h1 className="text-3xl font-semibold">Reviews</h1>
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
                                            Feedback
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Rating
                                        </th>
                                        <th
                                            scope="col"
                                            className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Username
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
                                    {localReviews
                                        ? localReviews.map((review) => (
                                              <tr
                                                  key={review.id}
                                                  className="bg-white transition-all duration-500 hover:bg-gray-50"
                                              >
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {review.FEEDBACK}
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {review.RATING}
                                                  </td>
                                                  <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {review.email}
                                                  </td>
                                                  <td className="p-5">
                                                      <div className="flex items-center gap-2 cursor-pointer">
                                                          <button
                                                              className="p-2 rounded-full group transition-all duration-500 flex items-center"
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      review.id
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
