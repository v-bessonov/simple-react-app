import React, {FC} from 'react';
import classes from "./MyInput.module.css"

interface InputProps {
    value: string | undefined;
    type: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MyInput: FC<InputProps> = ({value, type, placeholder, onChange}) => {
    return (
        <div>
            <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={classes.myInput}/>
        </div>
    );
};

export default MyInput;