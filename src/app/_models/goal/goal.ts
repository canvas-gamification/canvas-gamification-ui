export interface Goal {
    course_reg: number
    start_date: string
    end_date: string
    progress: number
    is_finished: boolean
    number_of_questions: number
    goal_items: GoalItem[]
}

export interface GoalItem {
    category: number
    difficulty: string
    number_of_questions: number
}
