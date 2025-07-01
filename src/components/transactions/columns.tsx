"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/features/transactions/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Tag } from "antd";

dayjs.extend(utc);

export const transactionColumns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const value = row.original.amount;
            const currency = row.original.currency;
            return <span className="font-semibold">{`${value} ${currency}`}</span>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>();
            const color =
                status === "completed"
                    ? "green"
                    : status === "pending"
                        ? "orange"
                        : "red";
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
        enableColumnFilter: true,
        meta: {
            filterOptions: [
                { text: "Completed", value: "completed" },
                { text: "Pending", value: "pending" },
                { text: "Failed", value: "failed" },
            ],
        },
        enableSorting: true,
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ getValue }) => {
            const timestamp = getValue<string>();
            const formatted = dayjs.utc(timestamp).format("DD MMM YYYY (HH:mm)");
            return <span>{formatted}</span>;
        },
        enableSorting: true,
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorFn: (row) => row.merchant?.name,
        id: "merchant",
        header: "Merchant",
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.payment_method?.brand,
        id: "payment_method",
        header: "Payment Method",
    },
    {
        accessorFn: (row) => row.sender?.name,
        id: "sender",
        header: "Sender",
    },
    {
        accessorFn: (row) => row.receiver?.name,
        id: "receiver",
        header: "Receiver",
    },
    {
        accessorFn: (row) => row.fees.processing_fee,
        id: "fee",
        header: "Processing Fee",
        cell: ({ row }) => {
            const value = row.original.fees.processing_fee;
            const currency = row.original.fees.currency;
            return `${value} ${currency}`;
        },
        enableSorting: true,
    },
    {
        accessorFn: (row) => row.metadata.order_id,
        id: "order_id",
        header: "Order ID",
    },
    {
        accessorFn: (row) => row.metadata.customer_id,
        id: "customer_id",
        header: "Customer ID",
    },
];
