'use client';

import { flexRender, Row } from '@tanstack/react-table';
import { Transaction } from '@/features/transactions/types';

type Props = {
    rows: Row<Transaction>[];
};

export default function TableRows({ rows }: Props) {
    return (
        <>
            {rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                    {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
