'use client';

import { useState } from "react";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import StatusFilter from "./filters/StatusFilter";
import DateRangeFilter from "./filters/DateRangeFilter";
import AmountRangeFilter from "./filters/AmountRangeFilter";

import { TransactionFilterValues } from "./filters/types";

type Props = {
    onChange: (values: TransactionFilterValues) => void;
};

const defaultFilters: TransactionFilterValues = {
    status: "all",
    dateRange: null,
    amountRange: [null, null],
    merchant: "all",
    paymentMethod: "all",
};

export default function TransactionsFilter({ onChange }: Props) {
    const [filters, setFilters] = useState<TransactionFilterValues>(defaultFilters);
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
                            onChange={(val) => {
                                const next = {...filters, status: val};
                                setFilters(next);
                                onChange(next); // 🔁 انتقال مستقیم و ایمن
                            }}
                        />

                    </div>
                    <div className="w-full md:w-1/3">
                        <DateRangeFilter
                            value={filters.dateRange}
                            onChange={(val) => {
                                const next = {...filters, dateRange: val};
                                setFilters(next);
                                onChange(next);
                            }}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <AmountRangeFilter
                            value={filters.amountRange}
                            onChange={(val) => {
                                const next = {...filters, amountRange: val};
                                setFilters(next);
                                onChange(next);
                            }}
                        />
                    </div>


                </div>
            )}
        </div>
    );
}
