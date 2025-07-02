import { useState } from "react";
import { Transaction } from "@/features/transactions/types";
import { useAddTransaction } from "@/hooks/queries/useAddTransaction";
import { toast } from "react-toastify";

type Props = {
    allTransactions: Transaction[];
    refetch: () => void;
};

export const useTransactionAdder = ({ allTransactions, refetch }: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { mutate: addTransaction } = useAddTransaction();

    const handleAddTransaction = (newTxn: Omit<Transaction, "id">) => {
        const lastTxn = allTransactions[allTransactions.length - 1];
        const lastId = parseInt(lastTxn?.id.split("_")[1] || "0", 10);
        const newId = `txn_${String(lastId + 1).padStart(3, "0")}`;

        addTransaction(
            { id: newId, ...newTxn },
            {
                onSuccess: () => {
                    setIsModalVisible(false);
                    toast.success("Transaction successfully saved.");
                    refetch();
                },
                onError: (error) => {
                    console.log("React Query error:", error);
                    setIsModalVisible(false);
                    toast.error("Failed to save transaction. Please try again.");
                    refetch();
                },
            }
        );
    };

    return {
        isModalVisible,
        setIsModalVisible,
        handleAddTransaction,
    };
};
