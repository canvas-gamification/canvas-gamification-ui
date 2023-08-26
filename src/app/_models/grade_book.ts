export type GradeBook = {
    grade: number
    total: number
    name: string
    event_name: string
    legal_first_name: string
    legal_last_name: string
    student_number
    question_details: {
        title: string
        question_grade: number
        attempts: number
    }[]
}[]
