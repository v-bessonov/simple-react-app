import React, {FC} from 'react';
import {Params, useParams} from "react-router-dom";
import {useDataApi} from "../hooks/useFetching";
import {Comment, Post} from "../types/types";
import PostService from "../api/PostService";
import Loader from "../components/ui-kit/loader/Loader";

interface PostPageParams extends Params {
    id: string
}

const PostPage: FC = () => {
    const params = useParams<PostPageParams>();


    const [{
        data: post,
        isLoading: isPostLoading,
        error: postError,
    }] = useDataApi<Post>({
            initialGetParams: {
                ...PostService.getById(Number(params.id))
            },
            initialData: {id: 0, title: '', body: ''}
        }
    );

    const [{
        data: comments,
        isLoading: isCommentsLoading,
        error: commentsError,
    }] = useDataApi<Comment[]>({
            initialGetParams: {
                ...PostService.getCommentsByPostId(Number(params.id))
            },
            initialData: []
        }
    );


    return (
        <div>
            <h1>You opened post page with ID = {params.id}</h1>
            {postError && <h1>Error occurred ${postError}</h1>}
            {
                isPostLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Loader/></div>
                    :

                    <div>{post.title}</div>
            }

            <h1>Comments</h1>
            {commentsError && <h1>Error occurred ${commentsError}</h1>}
            {
                isCommentsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Loader/></div>
                    :

                    <div style={{marginTop : '15px'}}>
                        {comments.map(comment =>
                            <div key={comment.id}>
                                <h5>{comment.email}</h5>
                                <div>{comment.body}</div>
                            </div>
                        )}

                    </div>
            }

        </div>
    );
};

export default PostPage;