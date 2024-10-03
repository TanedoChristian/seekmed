import { configureStore } from "@reduxjs/toolkit";

import deliveryRiderReducer from "./deliveryRiderSlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        deliveryRider: deliveryRiderReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
