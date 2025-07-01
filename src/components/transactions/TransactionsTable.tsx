"use client";

import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";
import {Transaction} from "@/features/transactions/types";
import {transactionColumns} from "./columns";
import Spinner from "@/components/ui/Spinner";
import { getSortedRowModel, SortingState } from "@tanstack/react-table";
import { useState } from "react";

type Props = {
    data: Transaction[];
    loading: boolean;
    error: string | null;
    pagination: {
        current: number;
        pageSize: number;
        total: number;
        onChange: (page: number, pageSize: number) => void;
    };
    onSortChange?: (id: string | null, order: "asc" | "desc" | null) => void;
};

export default function TransactionsTable({data, loading, error, pagination, onSortChange}: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns: transactionColumns as ColumnDef<Transaction>[],
        manualPagination: true,
        pageCount: Math.ceil(pagination.total / pagination.pageSize),
        state: {
            pagination: {
                pageIndex: pagination.current - 1,
                pageSize: pagination.pageSize,
            },
            sorting,
        },
        onPaginationChange: (updater) => {
            const newPagination =
                typeof updater === "function" ? updater(table.getState().pagination) : updater;
            pagination.onChange(newPagination.pageIndex + 1, newPagination.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualSorting: true,
        onSortingChange: (updater) => {
            const newSorting = typeof updater === "function" ? updater(sorting) : updater;
            setSorting(newSorting);

            const sort = newSorting[0];

            if (!sort || !sort.id || sort.desc === undefined) {
                onSortChange?.(null, null); // حالت بدون سورت
            } else {
                onSortChange?.(sort.id, sort.desc ? "desc" : "asc");
            }
        },

        getSortedRowModel: getSortedRowModel(),

    });

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (loading) return <Spinner/>;

    return (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b text-xs uppercase font-medium text-gray-500">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className={`px-4 py-3 text-left whitespace-nowrap select-none ${
                                    header.column.columnDef.enableSorting ? "cursor-pointer" : ""
                                }`}
                                onClick={
                                    header.column.columnDef.enableSorting
                                        ? header.column.getToggleSortingHandler()
                                        : undefined
                                }
                            >
                                <div className="flex items-center gap-1">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.columnDef.enableSorting && (
                                        <>
                                            {header.column.getIsSorted() === "asc" && <span>🔼</span>}
                                            {header.column.getIsSorted() === "desc" && <span>🔽</span>}
                                            {header.column.getIsSorted() === false &&
                                                <span className="opacity-50">↕️</span>}
                                        </>
                                    )}
                                </div>
                            </th>


                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
                {/* تعداد ردیف‌ها */}
                <div className="flex items-center gap-2">
                    <label htmlFor="pageSize" className="text-sm">
                        Rows per page:
                    </label>
                    <select
                        id="pageSize"
                        className="border rounded px-2 py-1"
                        value={pagination.pageSize}
                        onChange={(e) =>
                            pagination.onChange(1, Number(e.target.value)) // برمی‌گردیم به صفحه اول با limit جدید
                        }
                    >
                        {[5, 10, 20, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>

                {/* دکمه‌های pagination */}
                <div className="space-x-2 flex items-center">
                    <button
                        onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
                        disabled={pagination.current === 1}
                        className="px-3 py-1.5 rounded border text-sm transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        ← Prev
                    </button>
                    <span>
      {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
    </span>
                    <button
                        onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
                        disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
                        className="px-3 py-1.5 rounded border text-sm transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Next →
                    </button>
                </div>
            </div>

        </div>
    );
}
