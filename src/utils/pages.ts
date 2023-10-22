export const getPageCount = (totalCount: number, limit: number): number =>
    Math.ceil(totalCount / limit);