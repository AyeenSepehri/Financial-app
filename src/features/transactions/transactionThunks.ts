import { createAsyncThunk } from "@reduxjs/toolkit";
import { Transaction } from "./types";
import axios from "axios";

export const fetchTransactions = createAsyncThunk<
    Transaction[],
    void,
    { rejectValue: string }
>("transactions/fetchAll", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:4000/transactions");
        return response.data;
    } catch (err) {
        console.error(err);
        return thunkAPI.rejectWithValue("خطا در گرفتن اطلاعات");
    }
});

