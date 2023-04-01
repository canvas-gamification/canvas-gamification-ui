import {AgreeQuestion, SelectQuestion} from "@app/accounts/survey/types"

// eslint-disable-next-line @typescript-eslint/naming-convention
export const S1SelectQuestions: SelectQuestion[] = [
    {
        text: 'Overall, how much did you use the gamification website?',
        code: 'S1-1',
        number: 1,
        choices: [
            "Always",
            "Often",
            "Somtimes",
            "Rarely",
            "Never",
        ]
    },
    {
        text: "Overall, how useful did you find the practice questions were on this site?",
        code: 'S1-2',
        number: 2,
        choices: [
            "Very useful",
            "Useful",
            "Moderately useful",
            "Slightly useful",
            "Not usefu",
        ]
    },
    {
        text: "Overall, was the site easy to use?",
        code: 'S1-3',
        number: 3,
        choices: [
            "Very easy to use",
            "Easy to use",
            "Moderately easy to use",
            "Slightly easy to use",
            "Not easy to use",
        ]
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const S1AgreeQuestions: AgreeQuestion[] = [
    {
        text: "I feel more confident about my programming ability after using the practice website.",
        code: "S1-A1",
    },
    {
        text: "The website helped me improve my studying habits.",
        code: "S1-A2",
    },
    {
        text: "I would like to be able to use this site for another programming course.",
        code: "S1-A3",
    },
    {
        text: "Practising on this site helped me improve my grades.",
        code: "S1-A4",
    },
    {
        text: "The variety of questions available helped me better understand the course topics.",
        code: "S1-A5",
    }
]
