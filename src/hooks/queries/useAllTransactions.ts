import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "@/features/transactions/types";

const fetchAllTransactions = async (): Promise<Transaction[]> => {
    const response = await axios.get("/api/transactions/list", {
        params: { _all: true },
    });
    return response.data.data;
};

export const useAllTransactions = () => {
    return useQuery<Transaction[]>({
        queryKey: ["all-transactions"],
        queryFn: fetchAllTransactions,
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        refetchOnWindowFocus: false,
    });
};
