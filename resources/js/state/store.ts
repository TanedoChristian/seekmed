import { configureStore } from "@reduxjs/toolkit";

import deliveryRiderReducer from "./deliveryRiderSlice";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
export const store = configureStore({
    reducer: {
        deliveryRider: deliveryRiderReducer,
        user: userReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
