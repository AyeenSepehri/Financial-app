import { FetchParams } from "@/features/transactions/transactionThunks";
import { TransactionFilterValues } from "@/components/transactions/filters/types";

export const buildQueryFromFilters = (
    filters: TransactionFilterValues,
    page: number,
    pageSize: number,
    sortBy?: string | null,
    sortOrder?: "asc" | "desc" | null
): FetchParams => {
    const query: FetchParams = {
        _page: page,
        _limit: pageSize,
    };

    // ======= status =======
    if (filters.status && filters.status !== "all") {
        query.status = filters.status;
    }

    // ======= amount range =======
    const [min, max] = filters.amountRange;
    if (min !== null && !isNaN(min)) {
        query.amount_gte = min;
    }
    if (max !== null && !isNaN(max)) {
        query.amount_lte = max;
    }

    // ======= date range =======
    const [start, end] = Array.isArray(filters.dateRange) ? filters.dateRange : [null, null];
    if (start && end) {
        query.start = start.toISOString();
        query.end = end.toISOString();
    }

    // ======= merchant =======
    if (filters.merchant && filters.merchant !== "all") {
        query.merchant = filters.merchant; // id
    }

    // ======= payment method =======
    if (filters.paymentMethod && filters.paymentMethod !== "all") {
        query.paymentMethod = filters.paymentMethod;
    }

    // ======= sorting =======
    if (sortBy && sortOrder) {
        query.sortBy = sortBy;
        query.sortOrder = sortOrder;
    }

    return query;
};
