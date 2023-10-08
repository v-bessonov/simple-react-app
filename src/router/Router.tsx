import {createBrowserRouter} from "react-router-dom";
import Root from "../pages/Root";
import Posts from "../pages/Posts";
import About from "../pages/About";
import Error from "../pages/Error";
import React from "react";
import PostPage from "../pages/PostPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        // errorElement: <Error/>,
        children: [
            {
                index: true,
                element: <Posts/>,
            },
            {
                path: "/post/:id",
                element: <PostPage/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "*",
                element: <Error/>,
            }
        ],
    },
]);