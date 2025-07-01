'use client';

type Props = {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
};

export default function TablePagination({ current, pageSize, total, onChange }: Props) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <label htmlFor="pageSize" className="text-sm">
                    Rows per page:
                </label>
                <select
                    id="pageSize"
                    className="border rounded px-2 py-1"
                    value={pageSize}
                    onChange={(e) => onChange(1, Number(e.target.value))}
                >
                    {[5, 10, 20, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-x-2 flex items-center">
                <button
                    onClick={() => onChange(current - 1, pageSize)}
                    disabled={current === 1}
                    className="px-3 py-1.5 rounded border text-sm transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    ← Prev
                </button>
                <span>
          {current} of {Math.ceil(total / pageSize)}
        </span>
                <button
                    onClick={() => onChange(current + 1, pageSize)}
                    disabled={current >= Math.ceil(total / pageSize)}
                    className="px-3 py-1.5 rounded border text-sm transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
