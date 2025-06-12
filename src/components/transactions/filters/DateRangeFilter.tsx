'use client';

import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type Props = {
    value: [string, string] | null;
    onChange: (value: [string, string] | null) => void;
};

export default function DateRangeFilter({ value, onChange }: Props) {
    const handleChange: RangePickerProps["onChange"] = (dates) => {
        if (!dates || !dates[0] || !dates[1]) {
            onChange(null);
        } else {
            onChange([
                dayjs(dates[0]).format("YYYY-MM-DD"),
                dayjs(dates[1]).format("YYYY-MM-DD"),
            ]);
        }
    };

    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-1 text-gray-700">Date Range</label>
            <RangePicker
                onChange={handleChange}
                style={{ width: "100%" }}
                value={
                    value
                        ? [dayjs(value[0], "YYYY-MM-DD"), dayjs(value[1], "YYYY-MM-DD")]
                        : null
                }
                format="YYYY-MM-DD"
            />
        </div>
    );
}