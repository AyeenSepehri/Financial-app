import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Transaction } from "@/features/transactions/types";

export const useAddTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTxn: Transaction) =>
            axios
                .post("/api/transactions/add", newTxn)
                .then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-transactions"] });
        },
    });
};
