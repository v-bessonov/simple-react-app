import React, {FC} from 'react';
import {Post} from "../types/types";
import MyButton from "./ui-kit/button/MyButton";
import {useNavigate } from "react-router-dom";


interface PostProps {
    post: Post,
    remove: (post: Post) => void
}

const PostItem: FC<PostProps> = ({
                                     post,
                                     remove
                                 }) => {
    const {id, title, body} = post;

    const navigate = useNavigate();

    const removePost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        remove(post)
    }

    const openPost = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        navigate(`/post/${post.id}`)
    }

    return (
        <div className="post" data-id={id}>
            <div className="post__content">
                <strong>{id}. {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={openPost}>Open</MyButton>
            </div>
            <div className="post__btns">
                <MyButton onClick={removePost}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;