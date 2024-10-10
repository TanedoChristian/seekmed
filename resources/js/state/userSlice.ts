import { createSlice } from "@reduxjs/toolkit";

interface User {
    dashboardCategory: number;
    isOrderAccepted: number;
}

const initialState: User = {
    dashboardCategory: 0,
    isOrderAccepted: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDashboardCategory: (state, action) => {
            state.dashboardCategory = action.payload;
        },

        setOrderAccepted: (state, action) => {
            state.isOrderAccepted = action.payload;
        },
    },
});

export const { setDashboardCategory, setOrderAccepted } = userSlice.actions;
export default userSlice.reducer;
