import { configureStore } from "@reduxjs/toolkit";

// در آینده: import transactionReducer from "@/features/transactions/transactionSlice";
const dummyReducer = () => ({});

export const store = configureStore({
    reducer: {
        dummy: dummyReducer,
        // transaction: transactionReducer, ← اینجا اضافه می‌کنیم بعداً
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // برای سازگاری با مقادیر غیرقابل‌سریال‌سازی مثل Date
        }),
    devTools: process.env.NODE_ENV !== "production",
});

// انواع کمکی برای استفاده در کل پروژه
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
