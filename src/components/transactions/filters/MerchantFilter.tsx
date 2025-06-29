'use client';

import {Select} from "antd";
import type {Transaction} from "@/features/transactions/types";

type Props = {
    merchantId: string;
    options: { label: string; value: string }[];
    onChange: (id: string) => void;
};

export default function MerchantFilter({merchantId, options, onChange}: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <Select
                showSearch
                allowClear
                placeholder="All merchants"
                value={merchantId !== "all" ? merchantId : undefined}
                onChange={(id) => onChange(id ?? "all")}
                options={[{label: "All merchants", value: "all"}, ...options]}
                filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                style={{width: "100%"}}
            />
        </div>
    );
}
