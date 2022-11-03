export interface Goal {
    id: number
    course_reg: number
    start_date: string
    end_date: string
    progress: number
    is_finished: boolean
    number_of_questions: number
    goal_items: GoalItem[]
    stats: GoalStats
}

export interface GoalItem {
    category: number
    difficulty: string
    number_of_questions: number
}

export interface GoalStats {
    [goalItem: number]: GoalItemStats
}

export interface GoalItemStats {
    total: number,
    correct: number,
    partially_correct: number,
    wrong: number,
}
