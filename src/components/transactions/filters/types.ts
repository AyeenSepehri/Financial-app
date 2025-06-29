import { Dayjs } from "dayjs";

export type TransactionFilterValues = {
    status: "all" | "completed" | "pending" | "failed";
    amountRange: [number | null, number | null];
    merchant: string;
    paymentMethod: string;
    dateRange: [Dayjs | null, Dayjs | null];
};
