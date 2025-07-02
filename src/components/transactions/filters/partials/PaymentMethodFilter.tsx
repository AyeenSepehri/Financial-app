'use client';
import {Select} from "antd";

type Props = {
    value: string; // e.g., "credit_card-visa"
    options: { label: string; options: { label: string; value: string }[] }[];
    onChange: (val: string) => void;
};

export default function PaymentMethodFilter({value, options, onChange}: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Payment method</label>
            <Select
                allowClear
                placeholder="All payment methods"
                value={value !== "all" ? value : undefined}
                onChange={(val) => onChange(val ?? "all")}
                options={[
                    {label: "All payment methods", value: "all"},
                    ...options
                ]}
                style={{width: "100%"}}
            />
        </div>
    );
}
