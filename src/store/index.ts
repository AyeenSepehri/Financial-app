import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "@/features/transactions/transactionSlice";

export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
