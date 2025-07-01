'use client';

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
    SortingState,
    Updater,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Transaction } from '@/features/transactions/types';
import { transactionColumns} from "@/components/transactions/table/columns/transactionColumns";

type UseTransactionsTableParams = {
    data: Transaction[];
    pageSize: number;
    currentPage: number;
    total: number;
    onPageChange: (page: number, pageSize: number) => void;
    onSortChange?: (id: string | null, order: 'asc' | 'desc' | null) => void;
};

export function useTransactionsTable({
                                         data,
                                         pageSize,
                                         currentPage,
                                         total,
                                         onPageChange,
                                         onSortChange,
                                     }: UseTransactionsTableParams) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns: transactionColumns as ColumnDef<Transaction>[],
        manualPagination: true,
        manualSorting: true,
        pageCount: Math.ceil(total / pageSize),
        state: {
            pagination: {
                pageIndex: currentPage - 1,
                pageSize,
            },
            sorting,
        },
        onPaginationChange: (updater: Updater<{ pageIndex: number; pageSize: number }>) => {
            const newPagination = typeof updater === 'function' ? updater({ pageIndex: currentPage - 1, pageSize }) : updater;
            onPageChange(newPagination.pageIndex + 1, newPagination.pageSize);
        },
        onSortingChange: (updater: Updater<SortingState>) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(newSorting);

            const sort = newSorting[0];
            if (!sort || !sort.id || sort.desc === undefined) {
                onSortChange?.(null, null);
            } else {
                onSortChange?.(sort.id, sort.desc ? 'desc' : 'asc');
            }
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return table;
}
