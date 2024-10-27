import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeekMedNotification {
    notifications: string;
}

const initialState: SeekMedNotification = {
    notifications: "",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<string>) {
            state.notifications = action.payload;
        },
    },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
