'use client';

import { flexRender, Header } from '@tanstack/react-table';
import { Transaction } from '@/features/transactions/types';

type Props = {
    headers: Header<Transaction, unknown>[];
};

export default function TableHeader({ headers }: Props) {
    return (
        <>
            {headers.map((header) => (
                <th
                    key={header.id}
                    className={`px-4 py-3 text-left whitespace-nowrap select-none ${
                        header.column.columnDef.enableSorting ? 'cursor-pointer' : ''
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
                                {header.column.getIsSorted() === 'asc' && <span>🔼</span>}
                                {header.column.getIsSorted() === 'desc' && <span>🔽</span>}
                                {header.column.getIsSorted() === false && <span className="opacity-50">↕️</span>}
                            </>
                        )}
                    </div>
                </th>
            ))}
        </>
    );
}
