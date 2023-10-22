import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Root from "../pages/Root";
import Posts from "../pages/Posts";
import About from "../pages/About";
import React, {FC} from "react";
import PostPage from "../pages/PostPage";
import LoginPage from "../pages/LoginPage";
import {useAuthContext} from "../context/context";
import Loader from "../components/ui-kit/loader/Loader";

const privateRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
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
                element: <Navigate to="/"/>,
            }
        ],
    },
]);

const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <LoginPage/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "*",
                element: <Navigate to="/"/>
            }
        ],
    },
]);


const Router: FC = () => {
    const {isAuth, isLoading} = useAuthContext()

    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            {
                isAuth ?
                    <RouterProvider router={privateRouter}/>
                    :
                    <RouterProvider router={publicRouter}/>
            }

        </>
    );
};

export default Router;