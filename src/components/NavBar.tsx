import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar__links">
                    <Link to="/about">About</Link>
                    <Link to="/">Posts</Link>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;