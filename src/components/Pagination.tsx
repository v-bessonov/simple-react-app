import React, {FC} from 'react';
import {PostParams, PostParams2} from "../types/types";


interface PaginationProps {
    pages: number[],
    postsParams: PostParams | PostParams2,
    setPostParams: (postParams: PostParams | PostParams2) => void
}

const Pagination: FC<PaginationProps> = ({
                                             pages, postsParams, setPostParams
                                         }) => {
    const goToPage = (e: React.MouseEvent<HTMLSpanElement>, page: number): void => {
        setPostParams({...postsParams, _page: page});
    }

    return (
        <div className="page__wrapper">
            {pages.map(p =>
                <span
                    key={p}
                    className={postsParams._page === p ? 'page page__current' : 'page'}
                    onClick={(event) => goToPage(event, p)}>
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;