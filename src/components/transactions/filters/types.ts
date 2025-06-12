export type TransactionFilterValues = {
    status: "all" | "completed" | "pending" | "failed";
    dateRange: [string, string] | null;
    amountRange: [number | null, number | null];
    merchant: string;
    paymentMethod: string;
};
