'use client';

import { Transaction } from '@/features/transactions/types';
import Spinner from '@/components/ui/Spinner';
import TableHeader from './partials/TableHeader';
import TableRows from './partials/TableRows';
import TablePagination from './partials/TablePagination';
import { useTransactionsTable } from '@/components/transactions/table/config/useTransactionsTable';


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
    onSortChange?: (id: string | null, order: 'asc' | 'desc' | null) => void;
};

export default function TransactionsTable({
                                              data,
                                              loading,
                                              error,
                                              pagination,
                                              onSortChange,
                                          }: Props) {

    const table = useTransactionsTable({
        data,
        pageSize: pagination.pageSize,
        currentPage: pagination.current,
        total: pagination.total,
        onPageChange: pagination.onChange,
        onSortChange,
    });

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (loading) return <Spinner />;

    return (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-50 border-b text-xs uppercase font-medium text-gray-500">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        <TableHeader headers={headerGroup.headers} />
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y">
                <TableRows rows={table.getRowModel().rows} />
                </tbody>
            </table>

            <TablePagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={pagination.onChange}
            />
        </div>
    );
}
