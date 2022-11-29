import {GoalItem} from "@app/_models/goal/goal"


export const goalItemString = (goalItem: GoalItem) => {
    return `Solve ${goalItem.number_of_questions} ${goalItem.difficulty} questions from ${goalItem.category_name}`
}
