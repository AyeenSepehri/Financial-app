'use client';

import { useMemo, Suspense, lazy, useEffect } from "react";
import {useAppSelector} from "@/hooks/reduxHooks/useAppSelector";
import { useAppDispatch} from "@/hooks/reduxHooks/useAppDispatch";
import { useTransactionFilters } from "@/hooks/customHooks/useTransactionFilters";
import { usePagination } from "@/hooks/customHooks/usePagination";
import { useSorting } from "@/hooks/customHooks/useSorting";
import { useTransactionFetcher } from "@/hooks/customHooks/useTransactionFetcher";
import { useTransactionAdder } from "@/hooks/customHooks/useTransactionAdder";
import { useAllTransactions } from "@/hooks/queries/useAllTransactions";
import { Button, Spin } from "antd";

// PRPL Pattern: Lazy load components with preloading
const TransactionsFilter = lazy(() => import("../filters/TransactionsFilter"));
const TransactionsTable = lazy(() => import("../table/TransactionsTable"));
const AddTransactionModal = lazy(() => import("../modals/AddTransactionModal"));

// Preload critical components after initial render
const preloadComponents = () => {
  // Preload table component after filter is loaded
  setTimeout(() => {
    import("../table/TransactionsTable");
  }, 100);
  
  // Preload modal component after table is loaded
  setTimeout(() => {
    import("../modals/AddTransactionModal");
  }, 200);
};

// Loading component for Suspense
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
        <Spin size="large" />
    </div>
);

export default function TransactionsContainer() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((s) => s.transactions);
    const { data: allTransactions = [], isLoading: allLoading } = useAllTransactions();

    const {
        filters,
        setFilters,
        appliedFilters,
        applyFilters
    } = useTransactionFilters();

    const {
        page,
        pageSize,
        setPage,
        setPageSize
    } = usePagination();

    const {
        sortBy,
        sortOrder,
        setSortBy,
        setSortOrder
    } = useSorting();

    const {
        data: filteredItems,
        total: filteredTotal,
        fetch
    } = useTransactionFetcher({
        dispatch,
        filters: appliedFilters,
        page,
        pageSize,
        sortBy,
        sortOrder,
        initialItems: items
    });

    const {
        isModalVisible,
        setIsModalVisible,
        handleAddTransaction
    } = useTransactionAdder({
        allTransactions,
        refetch: fetch
    });

    // PRPL: Preload components after initial render
    useEffect(() => {
        preloadComponents();
    }, []);

    const merchantOptions = useMemo(() => {
        const map = new Map<string, string>();
        allTransactions.forEach((txn) => {
            if (txn.merchant?.id && txn.merchant?.name) {
                map.set(txn.merchant.id, txn.merchant.name);
            }
        });
        return Array.from(map.entries()).map(([id, name]) => ({ value: id, label: name }));
    }, [allTransactions]);

    const paymentMethodOptions = useMemo(() => {
        const map = new Map<string, Set<string>>();
        allTransactions.forEach(({ payment_method }) => {
            if (payment_method?.type && payment_method?.brand) {
                const { type, brand } = payment_method;
                const set = map.get(type) ?? new Set();
                set.add(brand);
                map.set(type, set);
            }
        });
        return Array.from(map.entries()).map(([type, brands]) => ({
            label: type.replace("_", " ").toUpperCase(),
            options: Array.from(brands).map((brand) => ({
                value: `${type}-${brand}`,
                label: `${type.replace("_", " ").toUpperCase()} (${brand.toUpperCase()})`,
            }))
        }));
    }, [allTransactions]);

    return (
        <div>
            {/* PRPL: Push critical content first */}
            <Suspense fallback={<LoadingSpinner />}>
                <TransactionsFilter
                    filters={filters}
                    merchantOptions={merchantOptions}
                    paymentMethodOptions={paymentMethodOptions}
                    onChange={setFilters}
                    onApply={applyFilters}
                />
            </Suspense>

            <Button type="primary" onClick={() => setIsModalVisible(true)} className="mb-4">
                Add Transaction
            </Button>

            {/* PRPL: Render main content */}
            <Suspense fallback={<LoadingSpinner />}>
                <TransactionsTable
                    data={filteredItems}
                    loading={loading || allLoading}
                    error={error}
                    pagination={{
                        current: page,
                        pageSize,
                        total: filteredTotal,
                        onChange: (newPage, newSize) => {
                            setPage(newPage);
                            setPageSize(newSize);
                        },
                    }}
                    onSortChange={(id, order) => {
                        setSortBy(id);
                        setSortOrder(order);
                        setPage(1);
                    }}
                />
            </Suspense>

            {/* PRPL: Lazy load modal */}
            <Suspense fallback={<LoadingSpinner />}>
                <AddTransactionModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onAdd={handleAddTransaction}
                />
            </Suspense>
        </div>
    );
}
