'use client';

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { store } from "@/store";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider>
                    {children}
                </ConfigProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
}
