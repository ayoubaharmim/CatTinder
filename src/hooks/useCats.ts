import { useQuery } from "@tanstack/react-query"
import { getCats } from "../api";
import { Cat } from "../types/api";

export const useCats = (limit: number = 10) => {
    return useQuery<Cat[], Error>({
        queryKey: ['cats', limit],
        queryFn: () => getCats(limit),
    });
};