'use client';

import { Select } from "antd";

type Props = {
    merchantId: string;
    options: { label: string; value: string }[];
    onChange: (id: string) => void;
};

export default function MerchantFilter({merchantId, options, onChange}: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Merchant</label>
            <Select
                showSearch
                value={merchantId}
                onChange={onChange}
                placeholder="Select merchant"
                allowClear
                options={[{label: "All merchants", value: "all"}, ...options]}
                filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                style={{width: "100%"}}
            />
        </div>
    );
}
