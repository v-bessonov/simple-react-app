import {FetchGet} from "../types/types";

export default class PostService {
    static getAll(): FetchGet {
        let page = 1
        if (localStorage.getItem('page')) {
            page = Number(localStorage.getItem('page'))
        }
        return {
            url: 'https://jsonplaceholder.typicode.com/posts',
            params: {
                _limit: 10,
                _page: page,
                isInfiniteScroll : true,
            }
        };
    }

    static getById(id : number): FetchGet {
        return {
            url: `https://jsonplaceholder.typicode.com/posts/${id}`,
            params : null
        };
    }

    static getCommentsByPostId(id : number): FetchGet {
        return {
            url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
            params : null
        };
    }
}