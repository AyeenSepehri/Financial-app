'use client';

import { InputNumber } from "antd";

type Props = {
    value: [number | null, number | null];
    onChange: (value: [number | null, number | null]) => void;
};

export default function AmountRangeFilter({ value, onChange }: Props) {
    const handleMinChange = (val: number | null) => {
        onChange([val, value[1]]);
    };

    const handleMaxChange = (val: number | null) => {
        onChange([value[0], val]);
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Amount Range</label>
            <div className="flex gap-2">
                <InputNumber
                    placeholder="Min"
                    value={value[0] ?? undefined}
                    onChange={handleMinChange}
                    style={{ width: "50%" }}
                    min={0}
                />
                <InputNumber
                    placeholder="Max"
                    value={value[1] ?? undefined}
                    onChange={handleMaxChange}
                    style={{ width: "50%" }}
                    min={0}
                />
            </div>
        </div>
    );
}