import React, {FC} from 'react';
import './styles/App.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router/Router";


const App: FC = () => {



    return (
        <RouterProvider router={router}/>
    );
}

export default App;
