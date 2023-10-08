import React, {FC} from 'react';
import {PostParams} from "../types/types";


interface PaginationProps {
    pages: number[],
    postsParams: PostParams | null,
    setPostParams: (postParams: PostParams | null) => void
}

const Pagination: FC<PaginationProps> = ({
                                             pages, postsParams, setPostParams
                                         }) => {
    const goToPage = (e: React.MouseEvent<HTMLSpanElement>, page: number): void => {
        if (postsParams) {
            setPostParams({...postsParams, _page: page});
        }

    }

    return (
        <div className="page__wrapper">
            {pages.map(p =>
                <span
                    key={p}
                    className={(postsParams?._page ?? 0) === p ? 'page page__current' : 'page'}
                    onClick={(event) => goToPage(event, p)}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;