import {Category} from "@app/_models"
import {Difficulty} from "@app/_models/difficulty"

export class GoalTask {
    goal: string
    category: Category
    difficulty: Difficulty
    number_of_questions: number

    constructor(goal: string, category: Category, difficulty: Difficulty, numberOfQuestions: number) {
        this.goal = goal
        this.category = category
        this.difficulty = difficulty
        this.number_of_questions = numberOfQuestions
    }

    toString(): string {
        let str = ""
        let pluralVar = "questions"
        if (this.number_of_questions == 1) pluralVar = "question"
        str += "Solve " + this.number_of_questions + " "
            + this.difficulty.toString().toLowerCase() + " " + pluralVar + " from " + this.category.full_name

        return str
    }
}
