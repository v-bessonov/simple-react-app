export const getPageCount = (totalCount: number, limit :number): number => {
    console.log('----------------')
    console.log(Math.ceil(totalCount / limit))
    return Math.ceil(totalCount / limit);
}