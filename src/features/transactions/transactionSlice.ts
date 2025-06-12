import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import { fetchTransactions } from "./transactionThunks";

interface TransactionState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    items: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        // در صورت نیاز، reducerهای sync رو اینجا می‌ذاریم (مثلاً فیلترها)
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknown error";
            });
    },
});

export default transactionSlice.reducer;
