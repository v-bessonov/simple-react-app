import React, {FC} from 'react';
import classes from './MyButton.module.css'

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    style? : React.CSSProperties,
    children?: React.ReactNode
}

const MyButton:FC<ButtonProps> = ({onClick, style, children}) => {
    return (
        <div>
            <button style={style} className={classes.myBtn} onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default MyButton;