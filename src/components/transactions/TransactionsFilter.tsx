'use client';

import { useState } from "react";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import StatusFilter from "./filters/StatusFilter";
import AmountRangeFilter from "./filters/AmountRangeFilter";
import DateRangeFilter from "./filters/DateRangeFilter";
import { TransactionFilterValues } from "./filters/types";

type Props = {
    filters: TransactionFilterValues;
    onChange: (values: TransactionFilterValues) => void;
    onApply: () => void;
};

export default function TransactionsFilter({ filters, onChange, onApply }: Props) {
    const [open, setOpen] = useState(false);
    const toggleCollapse = () => setOpen((prev) => !prev);

    return (
        <div className="mb-6">
            <Button
                type="default"
                onClick={toggleCollapse}
                icon={open ? <UpOutlined /> : <DownOutlined />}
                className="mb-3"
            >
                Filters
            </Button>

            {open && (
                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded border shadow-sm">
                    <div className="w-full md:w-1/3">
                        <StatusFilter
                            value={filters.status}
                            onChange={(val) => onChange({ ...filters, status: val })}
                        />
                    </div>

                    <div className="w-full md:w-1/3">
                        <AmountRangeFilter
                            value={filters.amountRange}
                            onChange={(val) => onChange({ ...filters, amountRange: val })}
                        />
                    </div>

                    <div className="w-full md:w-1/3">
                        <DateRangeFilter
                            value={filters.dateRange}
                            onChange={(val) => onChange({ ...filters, dateRange: val })}
                        />
                    </div>
                </div>
            )}

            {open && (
                <Button type="primary" onClick={onApply} className="mt-3">
                    Apply Filters
                </Button>
            )}
        </div>
    );
}
