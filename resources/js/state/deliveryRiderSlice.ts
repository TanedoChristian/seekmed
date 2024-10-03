import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the DeliveryRider interface
interface DeliveryRider {
    id: number;
    FNAME: string;
    LNAME: string;
    EMAIL: string;
    PASSWORD: string;
    CONTACTNO: string;
}

// Define async thunks for API calls
export const fetchDeliveryRiders = createAsyncThunk(
    "deliveryRider/fetchDeliveryRiders",
    async () => {
        const response = await axios.get("/api/rider");
        return response.data;
    }
);

export const addDeliveryRider = createAsyncThunk(
    "deliveryRider/addDeliveryRider",
    async (newRider: DeliveryRider) => {
        const response = await axios.post("/api/rider", newRider);
        return response.data;
    }
);

export const updateDeliveryRider = createAsyncThunk(
    "deliveryRider/updateDeliveryRider",
    async (updatedRider: DeliveryRider) => {
        const response = await axios.put(
            `/api/rider/${updatedRider.id}`,
            updatedRider
        );
        return response.data;
    }
);

export const deleteDeliveryRider = createAsyncThunk(
    "deliveryRider/deleteDeliveryRider",
    async (id: number) => {
        await axios.delete(`/api/rider/${id}`);
        return id;
    }
);

const initialState = {
    riders: [] as DeliveryRider[],
    loading: false,
    rider: null as DeliveryRider | null,
    error: null,
};

const deliveryRiderSlice = createSlice({
    name: "deliveryRider",
    initialState,
    reducers: {
        setRiders(state, action: PayloadAction<DeliveryRider[]>) {
            state.riders = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeliveryRiders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDeliveryRiders.fulfilled, (state, action) => {
                state.loading = false;
                state.riders = action.payload;
            })
            .addCase(fetchDeliveryRiders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addDeliveryRider.fulfilled, (state, action) => {
                state.riders.push(action.payload);
            })
            .addCase(updateDeliveryRider.fulfilled, (state, action) => {
                const index = state.riders.findIndex(
                    (rider) => rider.id === action.payload.id
                );
                if (index !== -1) {
                    state.riders[index] = action.payload;
                }
            })
            .addCase(deleteDeliveryRider.fulfilled, (state, action) => {
                state.riders = state.riders.filter(
                    (rider) => rider.id !== action.payload
                );
            });
    },
});

export const { setRiders } = deliveryRiderSlice.actions;

export default deliveryRiderSlice.reducer;
