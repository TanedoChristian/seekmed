import { CircularProgress, Divider } from "@mui/material";
import Map from "../Location/Map";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setOrder } from "@/state/orderSlice";

export default function Order({ orders, setTableCategory }) {
    const [tempOrders, setOrders] = useState(orders);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const updatedOrders = await Promise.all(
                    orders.map(async (order) => {
                        const response = await axios.get(
                            "https://nominatim.openstreetmap.org/search",
                            {
                                params: {
                                    q: order.address,
                                    format: "json",
                                    addressdetails: 1,
                                    limit: 1,
                                },
                            }
                        );

                        if (response.data && response.data.length > 0) {
                            const { lat, lon } = response.data[0];

                            return { ...order, latitude: lat, longitude: lon };
                        } else {
                            console.warn(
                                `No results found for address: ${order.address}`
                            );
                            return {
                                ...order,
                                latitude: null,
                                longitude: null,
                            };
                        }
                    })
                );
                setOrders(updatedOrders);
            } catch (error) {
                console.error("Error fetching location data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCoordinates();
    }, []);

    const handleAccept = (order) => {
        axios.post("/api/accept-orders", order).then((data) => {
            Swal.fire({
                icon: "success",
                text: `Accepted order id: ${order.order_id}`,
            });
            dispatch(setOrder(order));
            setTableCategory("chat");
        });
    };

    return (
        <section class="p-10 relative">
            <div class="w-full max-w-8xl mx-auto px-4 md:px-8">
                <h2 class="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
                    Order History
                </h2>

                <div class="flex sm:flex-col lg:flex-row sm:items-center justify-between">
                    <ul class="flex max-sm:flex-col sm:items-center gap-x-14 gap-y-3">
                        <li class="font-medium text-lg leading-8 cursor-pointer text-indigo-600 transition-all duration-500 hover:text-indigo-600">
                            All Order
                        </li>
                        <li class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                            On-Going
                        </li>
                        <li class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                            Completed
                        </li>
                        <li class="font-medium text-lg leading-8 cursor-pointer text-black transition-all duration-500 hover:text-indigo-600">
                            Cancelled
                        </li>
                    </ul>
                    <div class="flex max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
                        <div class="flex rounded-full py-3 px-4 border border-gray-300 relative">
                            <svg
                                class="relative "
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                    stroke="#111827"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                name="from-dt"
                                id="from-dt"
                                class="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                                placeholder="11-01-2023"
                            />
                        </div>
                        <p class="font-medium text-lg leading-8 text-black">
                            To
                        </p>
                        <div class="flex rounded-full py-3 px-4 border border-gray-300 relative">
                            <svg
                                class="relative "
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M1.5 7.75H16.5M11.9213 11.875H11.928M11.9212 14.125H11.9279M9.14676 11.875H9.1535M9.14676 14.125H9.1535M6.37088 11.875H6.37762M6.37088 14.125H6.37762M5.25 4.75V1.75M12.75 4.75V1.75M7.5 18.25H10.5C13.3284 18.25 14.7426 18.25 15.6213 17.3713C16.5 16.4926 16.5 15.0784 16.5 12.25V9.25C16.5 6.42157 16.5 5.00736 15.6213 4.12868C14.7426 3.25 13.3284 3.25 10.5 3.25H7.5C4.67157 3.25 3.25736 3.25 2.37868 4.12868C1.5 5.00736 1.5 6.42157 1.5 9.25V12.25C1.5 15.0784 1.5 16.4926 2.37868 17.3713C3.25736 18.25 4.67157 18.25 7.5 18.25Z"
                                    stroke="#111827"
                                    stroke-width="1.8"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            <input
                                type="text"
                                name="to-dt"
                                id="to-dt"
                                class="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                                placeholder="11-01-2023"
                            />
                        </div>
                    </div>
                </div>

                <div class="mt-7 border border-gray-300 pt-9 h-[70vh] overflow-auto">
                    {tempOrders
                        ? tempOrders.map((order) => (
                              <div>
                                  <div class="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 p-2">
                                      <div class="grid grid-cols-4 w-full">
                                          {order.latitude ? (
                                              <Map
                                                  lat={order.latitude}
                                                  lon={order.longitude}
                                                  order={order}
                                              />
                                          ) : (
                                              <div className="flex items-center justify-center">
                                                  <CircularProgress />
                                              </div>
                                          )}

                                          <div class="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                                              <h6 class="font-manrope font-semibold leading-9 text-black mb-3 whitespace-nowrap">
                                                  {order.address}
                                              </h6>
                                              <p class="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
                                                  By:
                                                  <span className=" ml-1 text-black">
                                                      {order.name}
                                                  </span>
                                              </p>
                                              <div class="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                                                  <span class="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                                                      Total quantity: 1
                                                  </span>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                                          <div class="flex flex-col justify-center items-start max-sm:items-center">
                                              <p class="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                                                  Status
                                              </p>

                                              <p class="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap uppercase">
                                                  {order.status}
                                              </p>
                                          </div>
                                          <div class="flex gap-3 justify-center items-start max-sm:items-center">
                                              <button
                                                  className="text-white bg-main px-7 py-1.5 shadow-md rounded-sm"
                                                  onClick={() =>
                                                      handleAccept(order)
                                                  }
                                              >
                                                  Accept
                                              </button>
                                          </div>
                                      </div>
                                  </div>

                                  <Divider />
                              </div>
                          ))
                        : ""}
                </div>
            </div>
        </section>
    );
}
