import React, {FC, useState} from 'react';
import MyInput from "./ui-kit/input/MyInput";
import MyButton from "./ui-kit/button/MyButton";
import {Post} from "../types/types";

interface PostFormProps {
    create: (post: Post) => void

}

const PostForm: FC<PostFormProps> = ({create}) => {
    const [post, setPost] = useState<Post>({
        id: 0,
        title: '',
        body: ''
    });

    const setPostTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPost({...post, title: e.target.value});
    }
    const setPostBody = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPost({...post, body: e.target.value});
    }
    const addNewPost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({...post, title: '', body: ''});
    }
    return (
        <div>
            <form>
                <MyInput value={post.title} type="text" placeholder="Post name" onChange={setPostTitle}/>
                <MyInput value={post.body} type="text" placeholder="Post decription" onChange={setPostBody}/>
                <MyButton onClick={addNewPost}>Add post</MyButton>
            </form>
        </div>
    );
};

export default PostForm;