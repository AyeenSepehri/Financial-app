import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "@/features/transactions/types";

export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTxn: Transaction) => {
            const response = await axios.post("/api/transactions/add", newTxn);
            console.log("API Response:", response.data);
            return response.data;
        },
        onSuccess: (data) => {
            console.log("Success callback:", data);
            queryClient.invalidateQueries({ queryKey: ["all-transactions"] });
            return data;
        },
        onError: (error) => {
            console.error("Add transaction error:", error);
            throw error;
        },
    });
};
