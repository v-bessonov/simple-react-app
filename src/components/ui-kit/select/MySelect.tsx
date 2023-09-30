import React, {FC} from 'react';
import {Option} from "../../../types/types";

interface OptionProps {
    options: Option[],
    defaultValue : string,
    value: string,
    onChange: (value: string) => void
}
const MySelect:FC<OptionProps> = ({options, defaultValue, value, onChange}) => {

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        onChange(e.target.value)
    }
    return (
        <div>
            <select value={value} onChange={onChangeSelect}>
                <option disabled value="">{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
};

export default MySelect;