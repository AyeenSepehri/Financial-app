import { createSlice } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import { fetchTransactions } from "./transactionThunks";

interface TransactionState {
    items: Transaction[];
    total: number;
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.total = action.payload.total;
            })

            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Unknown error";
            });
    },
});

export default transactionSlice.reducer;
