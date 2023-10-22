import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useDataApi} from "../hooks/useFetching";
import {FetchGet, Filter, Post, PostParams} from "../types/types";
import PostService from "../api/PostService";
import {usePosts} from "../hooks/usePosts";
import {usePagination} from "../hooks/usePagination";
import MyButton from "../components/ui-kit/button/MyButton";
import MyModal from "../components/ui-kit/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/ui-kit/loader/Loader";
import List from "../components/List";
import PostItem from "../components/PostItem";
import Pagination from "../components/Pagination";
import {useObserver} from "../hooks/useObserver";


const Posts: FC = () => {

    const [{
        data: posts,
        isLoading: isPostsLoading,
        error: postError,
        totalPages: postsTotalPages,
        getParams: postsParam,
        setData: setPosts,
        setGetParams: setPostParams
    }] = useDataApi<Post[]>({
            initialGetParams: {
                ...PostService.getAll()
            },
            initialData: []
        }
    );

    const [filter, setFilter] = useState<Filter>({
        sort: '',
        query: '',
        limit: '10',
        isInfiniteScroll: true
    })

    const [modal, setModal] = useState<boolean>(false)

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const pages = usePagination(postsTotalPages);

    const createPost = (newPost: Post): void => {
        setPosts([...posts, {...newPost}]);
        setModal(false);
    }

    const removePost = (post: Post): void => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const addNewPost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setModal(true);
    }


    const targetRef = useRef<HTMLDivElement | null>(null);

    const onViewPortIn = useCallback(() => {
        setPostParams({
            ...postsParam as FetchGet, params: {
                ...postsParam?.params as PostParams,
                _page: (postsParam?.params?._page ?? 0) + 1,
                isInfiniteScroll: true
            } as PostParams
        });
    }, [postsParam, setPostParams]);

    useObserver(targetRef,
        (postsParam?.params?._page ?? 0) < postsTotalPages
        ,
        isPostsLoading,
        onViewPortIn);


    useEffect(() => {
        setPostParams({
            ...postsParam as FetchGet, params: {
                ...postsParam?.params as PostParams,
                _limit: Number(filter.limit),
                isInfiniteScroll: filter.isInfiniteScroll
            } as PostParams
        });
    }, [filter.limit, filter.isInfiniteScroll]);

    return (
        <div className="App">

            <MyButton style={{marginTop: '30px'}} onClick={addNewPost}>
                Add post
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>

            <PostFilter filter={filter} setFilter={setFilter}/>
            <Pagination pages={pages} postsParams={postsParam} setPostParams={setPostParams}/>

            {
                postError
                &&
                <h1>Error occurred ${postError}</h1>
            }

            <List
                items={sortedAndSearchedPosts}
                emptyItemsMessage="Post not found"
                renderItem={(post: Post) =>
                    <PostItem post={post} key={post.id} remove={removePost}/>
                }
            />
            {
                isPostsLoading
                &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/></div>
            }

            <div ref={targetRef} style={{height: '20px'}}>
            </div>
        </div>
    );
}

export default Posts;
