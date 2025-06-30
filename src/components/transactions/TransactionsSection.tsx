'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks/useAppDispatch";
import { useAppSelector } from "@/hooks/reduxHooks/useAppSelector";
import { fetchTransactions } from "@/features/transactions/transactionThunks";
import TransactionsFilter from "./TransactionsFilter";
import TransactionsTable from "./TransactionsTable";
import { TransactionFilterValues } from "./filters/types";
import { buildQueryFromFilters } from "@/hooks/buildQueryFromFilters";
import { useAllTransactions } from "@/hooks/queries/useAllTransactions";
import AddTransactionModal from "./AddTransactionModal";
import { Button } from "antd";
import {Transaction} from "@/features/transactions/types";

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
    const [appliedFilters, setAppliedFilters] = useState(filters);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { data: allTransactions = [], isLoading: allLoading } = useAllTransactions();

    const fetchAndFilterTransactions = useCallback(() => {
        const query = buildQueryFromFilters(filters, page, pageSize);

        dispatch(fetchTransactions(query)).then((action) => {
            if (fetchTransactions.fulfilled.match(action)) {
                setFilteredItems(action.payload.data);
                setFilteredTotal(action.payload.total);
            }
        });
    }, [dispatch, appliedFilters, page, pageSize]);

    useEffect(() => {
        fetchAndFilterTransactions();
    }, [fetchAndFilterTransactions]);

    const handleFilterChange = (updatedFilters: TransactionFilterValues) => {
        setFilters(updatedFilters);
        setPage(1);
    };

    const handlePageChange = (newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    const handleApplyFilters = () => {
        setAppliedFilters(filters);
        setPage(1);
    };

    const merchantOptions = useMemo(() => {
        const map = new Map<string, string>();
        allTransactions.forEach((txn) => map.set(txn.merchant.id, txn.merchant.name));
        return Array.from(map.entries()).map(([id, name]) => ({ value: id, label: name }));
    }, [allTransactions]);

    const paymentMethodOptions = useMemo(() => {
        const map = new Map<string, Set<string>>();
        allTransactions.forEach(({ payment_method }) => {
            const { type, brand } = payment_method;
            const set = map.get(type) ?? new Set<string>();
            set.add(brand);
            map.set(type, set);
        });
        return Array.from(map.entries()).map(([type, brands]) => ({
            label: type.replace("_", " ").toUpperCase(),
            options: Array.from(brands).map((brand) => ({
                value: `${type}-${brand}`,
                label: `${type.replace("_", " ").toUpperCase()} (${brand.toUpperCase()})`,
            })),
        }));
    }, [allTransactions]);

    const handleAddTransaction = (newTxn: Omit<Transaction, 'id'>) => {
        // این تابع بعداً با POST به سرور کامل میشه
        console.log("New Transaction:", newTxn);
        setIsModalVisible(false);
    };

    return (
        <div>
            <TransactionsFilter
                filters={filters}
                merchantOptions={merchantOptions}
                paymentMethodOptions={paymentMethodOptions}
                onChange={handleFilterChange}
                onApply={handleApplyFilters}
            />
            <Button type="primary" onClick={() => setIsModalVisible(true)} className="mb-4">
                Add Transaction
            </Button>
            <TransactionsTable
                data={filteredItems}
                loading={loading || allLoading}
                error={error}
                pagination={{
                    current: page,
                    pageSize,
                    total: filteredTotal,
                    onChange: handlePageChange,
                }}
            />
            <AddTransactionModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAdd={handleAddTransaction}
            />
        </div>
    );
}
