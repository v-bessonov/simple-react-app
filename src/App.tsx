import React, {FC, useState} from 'react';
import './App.css';
import {Filter, Post} from "./types/types";
import PostForm from "./components/PostForm";
import List from "./components/List";
import PostItem from "./components/PostItem";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/ui-kit/modal/MyModal";
import MyButton from "./components/ui-kit/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./api/PostService";
import Loader from "./components/ui-kit/loader/Loader";
import {useDataApi} from "./hooks/useFetching";
import {usePagination} from "./hooks/usePagination";
import Pagination from "./components/Pagination";

const App: FC = () => {

    const [{
        data: posts,
        isLoading: isPostsLoading,
        error: postError,
        totalPages: postsTotalPages,
        params: postsParam,
        setUrl: setPostUrl,
        setData: setPosts,
        setParams: setPostParams
    }] = useDataApi<Post[]>({
            initialGetParams: {
                ...PostService.getAll()
            },
            initialData: []
        }
    );


    const [filter, setFilter] = useState<Filter>({
        sort: '',
        query: ''
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

            {postError && <h1>Error occurred ${postError}</h1>}
            {
                isPostsLoading
                    ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                        <Loader/></div>
                    :
                    <List
                        items={sortedAndSearchedPosts}
                        emptyItemsMessage="Post not found"
                        renderItem={(post: Post) =>
                            <PostItem post={post} key={post.id} remove={removePost}/>
                        }
                    />
            }

            <Pagination pages={pages} postsParams={postsParam} setPostParams={setPostParams}/>

        </div>
    );
}

export default App;
