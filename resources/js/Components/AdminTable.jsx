import { Button, CircularProgress } from "@mui/material";
import AddItemsModal from "./AddItemModal";
import { TrashIcon } from "@radix-ui/react-icons";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function wAdminTable({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(false);

    const handleDelete = (id) => {
        setLoading(true);
        axios
            .delete(`/products/${id}`)
            .then(() => {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== id)
                );

                Swal.fire({
                    title: "Deleted!",
                    text: `Successfully deleted`,
                    icon: "success",
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    return (
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 w-[80%]">
            <div class="flex flex-col">
                <div className="w-full flex justify-between p-3">
                    <h1 className="text-3xl font-semibold">Products</h1>
                    <AddItemsModal setProducts={setProducts} />
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
                                            class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                                        >
                                            Price
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
                                    {products
                                        ? products.map((product) => (
                                              <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">
                                                      {product.PRODUCT_NAME}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {product.STOCK_QUANTITY}
                                                  </td>
                                                  <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                                                      {product.PRICE}
                                                  </td>
                                                  <td class=" p-5 ">
                                                      <div class="flex items-center gap-1">
                                                          <button
                                                              class="p-2 rounded-full  group transition-all duration-500  flex item-center"
                                                              onClick={() =>
                                                                  handleDelete(
                                                                      product.id
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
