export interface Goal {
    id: number
    course_reg: number
    start_date: string
    end_date: string
    progress: number
    is_finished: boolean
    number_of_questions: number
    goal_items: GoalItem[]
    claimed: boolean
}

export interface GoalItem {
    id: number
    category: number
    category_name: string
    difficulty: string
    progress: number
    number_of_questions: number
}

export interface GoalStats {
    [goalItem: number]: GoalItemStats
}

export type QuestionTypeKey = 'mcq' | 'java' | 'parsons' | 'all'

export type GoalItemStats = Record<QuestionTypeKey, {
    old_submissions: GoalItemSubmissionStats
    submissions: GoalItemSubmissionStats
}>

export interface GoalItemSubmissionStats {
    total: number
    correct: number
    partially_correct: number
    wrong: number
    success_rate: number
    total_questions: number
    correct_questions: number
    questions_success_rate: number
    messages: Record<string, number>
    error_messages: string[]
}

export interface GoalLimit {
    category: number
    difficulty: string
    unsolved_questions: number
}


