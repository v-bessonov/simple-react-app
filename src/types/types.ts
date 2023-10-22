export interface Entity {
    id: number
}

export interface Post extends Entity {
    title: string,
    body?: string
}

export interface Comment extends Entity {
    postId: number,
    name: string,
    email: string,
    body?: string
}

export interface FetchGet {
    url: string,
    params: PostParams | null
}


export interface FetchRequest<T> {
    initialGetParams: FetchGet,
    initialData: T
}

export interface PostParams {
    _limit: number,
    _page: number,
    isInfiniteScroll : boolean
}

export interface FetchResult<T> {
    data: T,
    isLoading: boolean,
    error: string,
    totalPages: number,
    getParams: FetchGet | null
    setData: (data: T) => void,
    setGetParams: (getParams: FetchGet) => void
}

export interface Option {
    name: string,
    value: string
}

export interface Filter {
    sort: string,
    query: string,
    limit: string,
    isInfiniteScroll : boolean
}