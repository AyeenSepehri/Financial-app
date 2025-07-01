import { useState } from "react";

export const usePagination = (initialPage = 1, initialPageSize = 5) => {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const resetPagination = () => {
        setPage(1);
    };

    return {
        page,
        setPage,
        pageSize,
        setPageSize,
        resetPagination,
    };
};
