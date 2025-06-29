'use client';

import {useState, useCallback, useEffect, useMemo} from "react";
import { useAppDispatch } from "@/hooks/reduxHooks/useAppDispatch";
import { useAppSelector } from "@/hooks/reduxHooks/useAppSelector";
import { fetchTransactions } from "@/features/transactions/transactionThunks";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import { TransactionFilterValues } from "./filters/types";
import { buildQueryFromFilters } from "@/hooks/buildQueryFromFilters";
import {Transaction} from "@/features/transactions/types";
import axios from "axios";

export default function TransactionsSection() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.transactions);

    const [filters, setFilters] = useState<TransactionFilterValues>({
        status: "all",
        amountRange: [null, null],
        merchant: "all",
        paymentMethod: "all",
        dateRange: [null, null],
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filteredItems, setFilteredItems] = useState(items);
    const [filteredTotal, setFilteredTotal] = useState(0);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        axios
            .get("/api/transactions/list", {
                params: { _all: true },
            })
            .then((res) => {
                setAllTransactions(res.data.data);
            })
            .catch((err) => console.error("Error loading all transactions", err));
    }, []);


    useEffect(() => {
        fetchAndFilterTransactions();
    }, [page, pageSize]);

    const fetchAndFilterTransactions = useCallback(() => {
        const query = buildQueryFromFilters(filters, page, pageSize);

        dispatch(fetchTransactions(query)).then((action) => {
            if (fetchTransactions.fulfilled.match(action)) {
                setFilteredItems(action.payload.data);
                setFilteredTotal(action.payload.total);
            }
        });
    }, [dispatch, filters, page, pageSize]);

    const handleFilterChange = (updatedFilters: TransactionFilterValues) => {
        setFilters(updatedFilters);
        setPage(1);
    };
    const merchantOptions = useMemo(() => {
        const map = new Map<string, string>();
        allTransactions.forEach((txn) => map.set(txn.merchant.id, txn.merchant.name));
        return Array.from(map.entries()).map(([id, name]) => ({ value: id, label: name }));
    }, [allTransactions]);


    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    return (
        <div>
            <TransactionsFilter
                filters={filters}
                merchantOptions={merchantOptions}
                onChange={handleFilterChange}
                onApply={fetchAndFilterTransactions}
            />
            <TransactionsTable
                data={filteredItems}
                loading={loading}
                error={error}
                pagination={{
                    current: page,
                    pageSize,
                    total: filteredTotal,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
}
