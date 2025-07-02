'use client';

import { Select } from "antd";

type Props = {
    value: "all" | "completed" | "pending" | "failed";
    onChange: (value: Props["value"]) => void;
};

const statusOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
    { label: "Failed", value: "failed" },
];

export default function StatusFilter({ value, onChange }: Props) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
            <Select
                value={value}
                onChange={onChange}
                options={statusOptions}
                style={{ width: "100%" }}
                placeholder="Select status"
                size="middle"
            />
        </div>
    );
}
