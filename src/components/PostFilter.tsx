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

    const onLimitChange = (selectedSort : string): void => {
        setFilter({...filter, limit:  selectedSort, isInfiniteScroll: false});
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
            <MySelect
                value={filter.limit}
                onChange={onLimitChange}
                defaultValue="posts amount on page"
                options={[
                    {name: "5", value: "5"},
                    {name: "10", value: "10"},
                    {name: "25", value: "25"},
                    {name: "Show all", value: "-1"},
                ]}/>
        </div>
    );
};

export default PostFilter;