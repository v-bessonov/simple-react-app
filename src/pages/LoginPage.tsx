import React, {FC} from 'react';
import MyInput from "../components/ui-kit/input/MyInput";
import MyButton from "../components/ui-kit/button/MyButton";
import {useAuthContext} from "../context/context";

const LoginPage: FC = () => {
    const {setIsAuth} = useAuthContext()
    const login = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', "true");
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    }
    return (
        <div>
            <h1>Login page</h1>
            <form>
                <MyInput value='' type="text" placeholder="Enter login" onChange={onChange}/>
                <MyInput value='' type="password" placeholder="Enter password" onChange={onChange}/>
                <MyButton onClick={login}>Login</MyButton>
            </form>
        </div>
    );
};

export default LoginPage;