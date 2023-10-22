import React, {FC, useEffect, useState} from 'react';
import './styles/App.css';
import Router from "./router/Router";
import {AuthContext} from "./context/context";


const App: FC = () => {

    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
        setIsLoading(false);
    }, []);
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading,
            setIsLoading
        }}>
            <Router/>
        </AuthContext.Provider>

    );
}

export default App;
