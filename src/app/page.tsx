'use client';
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks/useAppDispatch";
import {useAppSelector} from "@/hooks/reduxHooks/useAppSelector";
import { fetchTransactions } from "@/features/transactions/transactionThunks";

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Transactions</h1>
            <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(items, null, 2)}
      </pre>
        </div>
    );
}
