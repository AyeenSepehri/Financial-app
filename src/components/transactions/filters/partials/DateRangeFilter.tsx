'use client';

import { DatePicker } from "antd";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

type Props = {
    value: [Dayjs | null, Dayjs | null];
    onChange: (range: [Dayjs | null, Dayjs | null]) => void;
};

export default function DateRangeFilter({ value, onChange }: Props) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Date Range</label>
            <RangePicker
                value={value}
                onChange={(dates) => onChange(dates as [Dayjs | null, Dayjs | null])}
                format="YYYY-MM-DD"
                allowClear
                style={{ width: "100%" }}
            />
        </div>
    );
}
