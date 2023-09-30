import React, {FC} from 'react';
import MyInput from "./ui-kit/input/MyInput";
import MySelect from "./ui-kit/select/MySelect";
import {Filter} from "../types/types";

interface PostFilterProps {
    filter: Filter,
    setFilter: (filter: Filter) => void
}

const PostFilter: FC<PostFilterProps> = ({
                                             filter, setFilter
                                         }) => {

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFilter({...filter, query:  e.target.value});
    }

    const onSelectChange = (selectedSort : string): void => {
        setFilter({...filter, sort:  selectedSort});
    }

    return (

        <div>
            <MyInput value={filter.query} type="text" placeholder="Search" onChange={onSearchChange}/>
            <MySelect
                value={filter.sort}
                onChange={onSelectChange}
                defaultValue="sort by"
                options={[
                    {name: "by title", value: "title"},
                    {name: "by body", value: "body"}
                ]}/>
        </div>
    );
};

export default PostFilter;