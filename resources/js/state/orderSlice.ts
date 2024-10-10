import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
    order_id: number;
    address: string;
    cart_id: number;
    name: string;
    status: string;
    user_id: number;
    latitude: number;
    longitude: number;
}

const initialState: Order = {
    order_id: 0,
    address: "",
    cart_id: 0,
    name: "",
    status: "",
    user_id: 0,
    latitude: 0,
    longitude: 0,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setOrder(state, action: PayloadAction<Order>) {
            return { ...state, ...action.payload };
        },
        resetOrder(state) {
            return initialState;
        },
    },
});

export const { setOrder, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
