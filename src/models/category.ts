export interface Category {
    pk: number,
    name: string,
    description: string,
    parent: number,
    numQuestions: number,
    avgSuccess: number,
    nextCategories: number[],
}