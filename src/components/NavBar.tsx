import React from 'react';
import {Link} from "react-router-dom";
import MyButton from "./ui-kit/button/MyButton";
import {useAuthContext} from "../context/context";

const NavBar = () => {

    const {isAuth, setIsAuth} = useAuthContext()
    const logout = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (

        <>
            <nav className="navbar">
                {
                    isAuth &&
                    <MyButton onClick={logout}>
                        Logout
                    </MyButton>
                }

                <div className="navbar__links">
                    <Link to="/about">About</Link>
                    {
                        isAuth && <Link to="/">Posts</Link>
                    }
                    {
                        !isAuth && <Link to="/login">Login</Link>
                    }
                </div>
            </nav>
        </>
    );
};

export default NavBar;