export interface UserStats {
    difficulty: string,
    avgSuccess: number
}

export interface Stats {
    challenge_stats: {
        challenges_completed: number
    },
    goal_stats: {
        goals_completed: number
    },
    question_stats: {
        mcq: {
            questions_attempt: number,
            questions_solved: number,
            avgSuccess: number
        },
        java: {
            questions_attempt: number,
            questions_solved: number,
            avgSuccess: number
        },
        parsons:{
            questions_attempt: number,
            questions_solved: number,
            avgSuccess: number
        }
    },
    category_stats: {
        category: number,
        difficulty: string,
        questions_attempt: number,
        questions_solved: number,
        avgSuccess: number
    }[]
}
