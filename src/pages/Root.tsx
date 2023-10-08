import React, {FC} from 'react';
import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

const Root: FC = () => {
    return (
        <>
            <NavBar/>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
};

export default Root;