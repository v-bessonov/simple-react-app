import {FC, useState} from "react";
import {useDataApi} from "../hooks/useFetching";
import {Filter, Post} from "../types/types";
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


const Posts: FC = () => {

    const [{
        data: posts,
        isLoading: isPostsLoading,
        error: postError,
        totalPages: postsTotalPages,
        params: postsParam,
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

export default Posts;
