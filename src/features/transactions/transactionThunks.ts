import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import axios from "axios";

export type FetchParams = {
    _page: number;
    _limit: number;
    status?: string;
    merchant?: string;
    paymentMethod?: string;
    amount_gte?: number;
    amount_lte?: number;
    start?: string;
    end?: string;
    sortBy?: string | null,
    sortOrder?: "asc" | "desc" | null
};


export const fetchTransactions = createAsyncThunk<
    { data: Transaction[]; total: number },
    FetchParams,
    { rejectValue: string }
>("transactions/fetchAll", async (params, thunkAPI) => {
    try {
        const response = await axios.get("/api/transactions/list", { params });

        const { data, total } = response.data;

        return { data, total };
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue("Error when fetching data");
    }
});
