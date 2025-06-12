'use client';

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks/useAppDispatch";
import { useAppSelector } from "@/hooks/reduxHooks/useAppSelector";
import { fetchTransactions } from "@/features/transactions/transactionThunks";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import { Transaction } from "@/features/transactions/types";
import { TransactionFilterValues } from "./filters/types";

export default function TransactionsSection() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.transactions);
    const [filteredItems, setFilteredItems] = useState<Transaction[]>([]);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const applyFilters = (filters: TransactionFilterValues, data: Transaction[]) => {
        return data.filter((item) => {
            const matchesStatus =
                filters.status === "all" || item.status === filters.status;

            const matchesDateRange =
                !filters.dateRange ||
                (item.timestamp >= filters.dateRange[0] &&
                    item.timestamp <= filters.dateRange[1]);

            const [min, max] = filters.amountRange;
            const matchesAmount =
                (min === null || item.amount >= min) &&
                (max === null || item.amount <= max);

            return matchesStatus && matchesDateRange && matchesAmount;
        });
    };

    const handleFilterChange = (filters: TransactionFilterValues) => {
        const filtered = applyFilters(filters, items);
        setFilteredItems(filtered);
    };

    useEffect(() => {
        setFilteredItems(items);
    }, [items]);

    return (
        <div>
            <TransactionsFilter onChange={handleFilterChange} />
            <TransactionsTable data={filteredItems} loading={loading} error={error} />
        </div>
    );
}
