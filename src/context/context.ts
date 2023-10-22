import {createContext, useContext} from "react";


export type AuthContent = {
    isAuth: boolean,
    setIsAuth: (isAuth: boolean) => void,
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
}

export const AuthContext = createContext<AuthContent>({
    isAuth: false,
    setIsAuth: (isAuth: boolean) => {
    },
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {
    }
});

export const useAuthContext = () => useContext(AuthContext)