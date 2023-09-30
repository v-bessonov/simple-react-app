import {useMemo} from "react";

export const usePagination = (totalPages: number): number[] => {
    return useMemo<number[]>(() => {
        console.log("PAGINATION")

        let pages: number[] = [];
        for (let i = 0; i < totalPages; i++) {

            pages.push(i + 1)
        }
        return pages;
    }, [totalPages]);
}

