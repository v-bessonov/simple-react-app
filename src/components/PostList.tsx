import React, {FC} from 'react';
import PostItem from "./PostItem";
import {Post} from "../types/types";

interface PostsProps {
    posts : Post[],
    title: string,
    remove: (post: Post) => void
}

const PostList:FC<PostsProps> = ({posts, title, remove}) => {


    return (
        <div>
            <h1 style={{textAlign:'center'}}>
                {title}
            </h1>
            {
                posts.map((post) =>
                    <PostItem post={post} key={post.id} remove={remove}/>
                )
            }
        </div>
    );
};

export default PostList;