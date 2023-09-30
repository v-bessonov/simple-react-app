import {useMemo} from "react";
import {Post} from "../types/types";

export const useSortedPosts = (posts: Post[], sort: string) : Post[] => {
    return useMemo<Post[]>(() => {
        console.log("SORT")

        if (sort) {
            return [...posts].sort((a, b) => compare(a, b, sort));
        }
        return posts;
    }, [sort, posts]);
}

export const usePosts = (posts : Post[], sort : string, query: string) : Post[] => {
    const sortedPosts = useSortedPosts(posts, sort);
    return useMemo<Post[]>(() => {
        console.log("SORTANDSEARCH")
        return sortedPosts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);
}

function compare(a: Post, b: Post, sort: string): number {
    if (sort === 'body')
        return (a.body ?? '').localeCompare(b.body ?? '')

    return a.title.localeCompare(b.title)
}