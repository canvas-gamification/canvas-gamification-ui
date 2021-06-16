export interface McqRequestData {
    title: string,
    difficulty: string,
    course: number,
    event: number,
    text: string,
    answer: string,
    category: number,
    variables: JSON[],
    visible_distractor_count: number,
    choices: { [id: string]: string },
}
