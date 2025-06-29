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
            <label className="block mb-1 font-medium">Date Range</label>
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
