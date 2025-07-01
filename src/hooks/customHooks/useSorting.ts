import { useState } from "react";

type SortOrder = "asc" | "desc" | null;

export const useSorting = () => {
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    const toggleSort = (columnId: string) => {
        if (sortBy !== columnId) {
            setSortBy(columnId);
            setSortOrder("asc");
        } else {
            if (sortOrder === "asc") {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortBy(null);
                setSortOrder(null);
            } else {
                setSortOrder("asc");
            }
        }
    };

    const resetSorting = () => {
        setSortBy(null);
        setSortOrder(null);
    };

    return {
        sortBy,
        sortOrder,
        setSortBy,
        setSortOrder,
        toggleSort,
        resetSorting,
    };
};
