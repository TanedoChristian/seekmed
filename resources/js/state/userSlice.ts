import { createSlice } from "@reduxjs/toolkit";

interface User {
    dashboardCategory: number;
}

const initialState: User = {
    dashboardCategory: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDashboardCategory: (state, action) => {
            state.dashboardCategory = action.payload;
        },
    },
});

export const { setDashboardCategory } = userSlice.actions;
export default userSlice.reducer;
