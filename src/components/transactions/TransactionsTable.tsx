'use client';

import { Table } from "antd";
import { Transaction } from "@/features/transactions/types";
import { transactionColumns } from "./columns";


type Props = {
    data: Transaction[];
    loading: boolean;
    error: string | null;
};

export default function TransactionsTable({ data, loading, error }: Props) {
    if (error) {
        return <div className="text-red-500 p-4">Error: {error}</div>;
    }

    return (
        <Table
            className="p-4"
            columns={transactionColumns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
        />
    );
}
