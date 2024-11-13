import { CircularProgress, Divider } from "@mui/material";
import Map from "../Location/Map";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "@/state/orderSlice";
import OrdercCompleted from "./CompletedOrders";
import { setRiderDashboard } from "@/state/deliveryRiderSlice";

export default function Order({ orders, setTableCategory, setNotifications }) {
    const [tempOrders, setOrders] = useState(orders);
    const [isLoading, setIsLoading] = useState(true);

    const riderDashboard = useSelector(
        (state) => state.deliveryRider.dashboard
    );

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
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            "Order is Accepted",
        ]);
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
                        <li
                            class={`font-medium text-lg leading-8 cursor-pointer  ${
                                riderDashboard == 0
                                    ? "text-indigo-600"
                                    : "text-black"
                            } transition-all duration-500 hover:text-indigo-600`}
                            onClick={() => {
                                dispatch(setRiderDashboard(0));
                            }}
                        >
                            All Order
                        </li>
                        <li
                            class={`font-medium text-lg leading-8 cursor-pointer  ${
                                riderDashboard == 1
                                    ? "text-indigo-600"
                                    : "text-black"
                            } transition-all duration-500 hover:text-indigo-600`}
                            onClick={() => {
                                dispatch(setRiderDashboard(1));
                            }}
                        >
                            On-Going
                        </li>
                        <li
                            class={`font-medium text-lg leading-8 cursor-pointer  ${
                                riderDashboard == 2
                                    ? "text-indigo-600"
                                    : "text-black"
                            } transition-all duration-500 hover:text-indigo-600`}
                            onClick={() => {
                                dispatch(setRiderDashboard(2));
                            }}
                        >
                            Completed
                        </li>
                    </ul>
                </div>

                <div class="mt-7 border border-gray-300 pt-9 h-[70vh] overflow-auto">
                    {riderDashboard == 0 ? (
                        <>
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
                                                              handleAccept(
                                                                  order
                                                              )
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
                        </>
                    ) : riderDashboard == 1 ? (
                        "On Going"
                    ) : (
                        <OrdercCompleted />
                    )}
                </div>
            </div>
        </section>
    );
}
