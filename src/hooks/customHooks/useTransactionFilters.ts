import { useState } from "react";
import { TransactionFilterValues} from "@/components/transactions/filters/types";

export const useTransactionFilters = () => {
    const [filters, setFilters] = useState<TransactionFilterValues>({
        status: "all",
        amountRange: [null, null],
        merchant: "all",
        paymentMethod: "all",
        dateRange: [null, null],
    });

    const [appliedFilters, setAppliedFilters] = useState<TransactionFilterValues>(filters);

    const applyFilters = () => {
        setAppliedFilters(filters);
    };

    return {
        filters,
        setFilters,
        appliedFilters,
        applyFilters,
    };
};
