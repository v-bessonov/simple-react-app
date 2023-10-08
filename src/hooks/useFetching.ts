import {useEffect, useState} from "react";
import axios from "axios";
import {FetchRequest, FetchResult, PostParams} from "../types/types";
import {getPageCount} from "../utils/pages";

export const useDataApi = <T>(request: FetchRequest<T>): [FetchResult<T>] => {

    const {initialGetParams, initialData} = request;
    const {url: initialUrl, params: initialParams} = initialGetParams;

    const [data, setData] = useState<T>(initialData);
    const [url, setUrl] = useState<string>(initialUrl);
    const [isLoading, setIsLoading]
        = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [params, setParams]
        = useState<PostParams | null>(initialParams);

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            setError('');
            setIsLoading(true);

            try {
                const result = await axios.get<T>(url, {
                    params: params
                });
                const totalCount = result.headers["x-total-count"]

                setTotalPages(getPageCount(totalCount ?? 0, params?._limit ?? 1));

                if (!didCancel) {
                    setData(result.data);
                }
            } catch (error: any) {
                if (!didCancel) {
                    setError(error.message);
                }
            }

            setIsLoading(false);
        };

        fetchData().finally(() => {
            console.log('DATA LOADED')
        });

        return () => {
            didCancel = true;
        };
    }, [url, params]);

    return [{data, isLoading, error, totalPages, params, setUrl, setData, setParams}];
};