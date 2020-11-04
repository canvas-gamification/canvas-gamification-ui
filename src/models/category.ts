export interface Category {
    pk: number,
    name: string,
    description: string,
    parent: number,
    numQues: number,
    avgSuccess: number,
}