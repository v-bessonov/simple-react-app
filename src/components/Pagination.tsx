import React, {FC} from 'react';
import {FetchGet, PostParams} from "../types/types";

interface PaginationProps {
    pages: number[],
    postsParams: FetchGet | null,
    setPostParams: (postParams: FetchGet) => void
}

const Pagination: FC<PaginationProps> = ({
                                             pages, postsParams, setPostParams
                                         }) => {
    const goToPage = (e: React.MouseEvent<HTMLSpanElement>, page: number): void => {
        if (postsParams) {
            setPostParams({
                ...postsParams as FetchGet, params: {
                    ...postsParams?.params as PostParams,
                    _page: page,
                    _limit: postsParams?.params?._limit ?? 1,
                    isInfiniteScroll : false
                } as PostParams
            });
            localStorage.setItem('page', page.toString());
        }
    }

    return (
        <div className="page__wrapper">
            {pages.map(p =>
                <span
                    key={p}
                    className={(postsParams?.params?._page ?? 0) === p ? 'page page__current' : 'page'}
                    onClick={(event) => goToPage(event, p)}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;