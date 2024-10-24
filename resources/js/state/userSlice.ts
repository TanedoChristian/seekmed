import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    dashboardCategory: number;
    isOrderAccepted: number;
    reviews: any[];
}

const initialState: User = {
    dashboardCategory: 0,
    isOrderAccepted: 0,
    reviews: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setReviews(state, action: PayloadAction<any[]>) {
            state.reviews = action.payload;
        },

        setDashboardCategory: (state, action) => {
            state.dashboardCategory = action.payload;
        },

        setOrderAccepted: (state, action) => {
            state.isOrderAccepted = action.payload;
        },
    },
});

export const { setDashboardCategory, setOrderAccepted, setReviews } =
    userSlice.actions;
export default userSlice.reducer;
