'use client';

import { useState } from "react";
import { Button } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import StatusFilter from "./partials/StatusFilter";
import AmountRangeFilter from "./partials/AmountRangeFilter";
import DateRangeFilter from "./partials/DateRangeFilter";
import MerchantFilter from "./partials/MerchantFilter";
import { TransactionFilterValues } from "./types";
import PaymentMethodFilter from "@/components/transactions/filters/partials/PaymentMethodFilter";

type Props = {
    filters: TransactionFilterValues;
    merchantOptions: { label: string; value: string }[];
    paymentMethodOptions: { label: string; options: { label: string; value: string }[] }[];
    onChange: (values: TransactionFilterValues) => void;
    onApply: () => void;
};

export default function TransactionsFilter({ filters, merchantOptions, paymentMethodOptions, onChange, onApply }: Props) {
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
                    <div className="w-full md:w-1/4">
                        <StatusFilter
                            value={filters.status}
                            onChange={(val) => onChange({...filters, status: val})}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <AmountRangeFilter
                            value={filters.amountRange}
                            onChange={(val) => onChange({...filters, amountRange: val})}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <DateRangeFilter
                            value={filters.dateRange}
                            onChange={(val) => onChange({...filters, dateRange: val})}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <MerchantFilter
                            merchantId={filters.merchant}
                            options={merchantOptions}
                            onChange={(id) => onChange({...filters, merchant: id})}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <PaymentMethodFilter
                            value={filters.paymentMethod}
                            options={paymentMethodOptions}
                            onChange={(val) => onChange({...filters, paymentMethod: val})}
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
