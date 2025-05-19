export type GradeBook = {
    grade: number
    total: number
    name: string
    event_name: string
    question_details: {
        title: string
        question_grade: string
        attempts: number
        max_attempts: number
    }[]
}[]
