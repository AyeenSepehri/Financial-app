"use client"
import {Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import {Transaction} from "@/features/transactions/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const transactionColumns: ColumnsType<Transaction> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 100,
        ellipsis: true,
        sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        sorter: (a, b) => a.amount - b.amount,
        render: (value: number, record) => (
            <span className="font-semibold">{`${value} ${record.currency}`}</span>
        ),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        filters: [
            {text: "Completed", value: "completed"},
            {text: "Pending", value: "pending"},
            {text: "Failed", value: "failed"},
        ],
        onFilter: (value, record) => record.status === value,
        render: (status: string) => {
            const color =
                status === "completed"
                    ? "green"
                    : status === "pending"
                        ? "orange"
                        : "red";
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
    },
    {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        render: (timestamp: string) => {
            const formatted = dayjs.utc(timestamp).format("DD MMM YYYY (HH:mm)");
            return <span>{formatted}</span>;
        },
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
    },
    {
        title: "Merchant",
        dataIndex: ["merchant", "name"],
        key: "merchant",
        sorter: (a, b) => a.merchant.name.localeCompare(b.merchant.name),
    },
    {
        title: "Payment Method",
        dataIndex: ["payment_method", "brand"],
        key: "payment_method",
    },
    {
        title: "Sender",
        dataIndex: ["sender", "name"],
        key: "sender",
    },
    {
        title: "Receiver",
        dataIndex: ["receiver", "name"],
        key: "receiver",
    },
    {
        title: "Processing Fee",
        dataIndex: ["fees", "processing_fee"],
        key: "fee",
        align: "right",
        render: (value: number, record) => `${value} ${record.fees.currency}`,
        sorter: (a, b) => a.fees.processing_fee - b.fees.processing_fee,
    },
    {
        title: "Order ID",
        dataIndex: ["metadata", "order_id"],
        key: "order_id",
        width: 120,
    },
    {
        title: "Customer ID",
        dataIndex: ["metadata", "customer_id"],
        key: "customer_id",
        width: 120,
    },
];
