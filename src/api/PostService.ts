import {FetchGet} from "../types/types";

export default class PostService {


    static getAll(): FetchGet {
        return {
            url: 'https://jsonplaceholder.typicode.com/posts',
            params: {
                _limit: 10,
                _page: 3
            }
        };
    }
}