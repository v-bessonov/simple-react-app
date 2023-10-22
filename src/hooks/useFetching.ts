import {useEffect, useState} from "react";
import axios from "axios";
import {FetchGet, FetchRequest, FetchResult} from "../types/types";
import {getPageCount} from "../utils/pages";

export const useDataApi = <T>(request: FetchRequest<T>): [FetchResult<T>] => {

    const {initialGetParams, initialData} = request;

    const [data, setData] = useState<T>(initialData);
    const [isLoading, setIsLoading]
        = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);

    const [getParams, setGetParams]
        = useState<FetchGet>(initialGetParams);

    const isInfiniteScroll = getParams.params?.isInfiniteScroll ?? false;

    useEffect(() => {
        let didCancel = false;
        const {
            url,
            params
        } = getParams;

        const fetchData = async () => {
            setError('');
            setIsLoading(true);

            try {
                const result = await axios.get<T>(url, {
                    params: params
                });
                const totalCount: number = result.headers["x-total-count"]

                setTotalPages(getPageCount(totalCount ?? 0, params?._limit ?? 1));

                const isArray = Array.isArray(result.data);

                if (!didCancel) {
                    if (isInfiniteScroll && isArray) {
                        setData(data => [...(data as T[]), ...(result.data as T[])] as T);
                    } else {
                        setData(result.data);
                    }

                }
            } catch (error: any) {
                if (!didCancel) {
                    setError(error.message);
                }
            }
            setTimeout(() => { setIsLoading(false); }, 1000);
        };

        void fetchData();

        return () => {
            didCancel = true;
        };
    }, [getParams, isInfiniteScroll]);

    return [{data, isLoading, error, totalPages, getParams, setData, setGetParams}];
};