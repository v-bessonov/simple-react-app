export interface Entity {
    id: number
}

export interface Post extends Entity {
    title: string,
    body?: string
}

export interface FetchGet {
    url: string,
    params: PostParams | PostParams2
}


export interface FetchRequest<T> {
    initialGetParams: FetchGet,
    initialData : T
}

export interface PostParams {
    _limit: number,
    _page: number
}

export interface PostParams2 {
    _limit: number,
    _page: number
}

export interface PostParamsGet {

}

export interface FetchResult<T> {
    data: T,
    isLoading: boolean,
    error: string,
    totalPages : number,
    params: PostParams | PostParams2
    setUrl: (url: string) => void,
    setData : (data: T) => void,
    setParams: (params: PostParams | PostParams2) => void
}

export interface Option {
    name: string,
    value: string
}

export interface Filter {
    sort: string,
    query: string
}