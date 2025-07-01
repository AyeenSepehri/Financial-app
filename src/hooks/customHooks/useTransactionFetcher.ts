import { useState, useCallback, useEffect } from "react";
import { AppDispatch } from "@/store";
import { TransactionFilterValues } from "@/components/transactions/filters/types";
import { fetchTransactions } from "@/features/transactions/transactionThunks";
import { Transaction } from "@/features/transactions/types";
import { buildQueryFromFilters } from "@/app/api/transactions/list/utils/buildQueryFromFilters";

type Props = {
    dispatch: AppDispatch;
    filters: TransactionFilterValues;
    page: number;
    pageSize: number;
    sortBy: string | null;
    sortOrder: "asc" | "desc" | null;
    initialItems: Transaction[];
};

export const useTransactionFetcher = ({
                                          dispatch,
                                          filters,
                                          page,
                                          pageSize,
                                          sortBy,
                                          sortOrder,
                                          initialItems,
                                      }: Props) => {
    const [data, setData] = useState<Transaction[]>(initialItems);
    const [total, setTotal] = useState(0);

    const fetch = useCallback(() => {
        const query = buildQueryFromFilters(filters, page, pageSize, sortBy, sortOrder);

        dispatch(fetchTransactions(query)).then((action) => {
            if (fetchTransactions.fulfilled.match(action)) {
                setData(action.payload.data);
                setTotal(action.payload.total);
            }
        });
    }, [dispatch, filters, page, pageSize, sortBy, sortOrder]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        data,
        total,
        fetch,
    };
};
