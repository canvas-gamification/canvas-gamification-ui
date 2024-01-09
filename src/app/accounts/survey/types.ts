export interface AgreeQuestion {
    text: string
    code: string
}

export interface CheckBoxQuestion {
    text: string,
    code: string,
    number: number,
    choices: string[]
}

export type SelectQuestion = CheckBoxQuestion
