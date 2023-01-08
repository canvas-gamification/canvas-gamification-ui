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

export const agreeQuestions: AgreeQuestion[] = [
    {
        text: "Goal setting is important and helpful for learning",
        code: "a",
    },
    {
        text: "I don't know how to set goals for myself",
        code: "b",
    },
    {
        text: "I have trouble studying or learning if there is no clear goal in my mind",
        code: "c"
    },
    {
        text: "I always try to have realistic goals that I believe I can achieve",
        code: "d"
    },
    {
        text: "I try to set goals beyond my capacity from time to time to challenge myself",
        code: "e"
    },
    {
        text: "Failure is a natural part of the learning and it can help me identify where I can improve and grow",
        code: "f"
    },
    {
        text: "Having a goal in mind makes me try harder to achieve it (compared to not having any goals in mind)",
        code: "g"
    },
    {
        text: "I've tried setting goals but they don't seem to work for me",
        code: "h"
    },
    {
        text: "Goal setting can help me understand my mistakes and areas that I need help with",
        code: "i"
    },
    {
        text: "Goal setting can have a significant positive impact on my final grade in this course",
        code: "j"
    },
    {
        text: "Goal setting can have a significant positive impact on my overall learning",
        code: "k"
    },
]

export const checkboxQuestions: CheckBoxQuestion[] = [
    {
        text: "How do you set goals for your learning? Check all that apply.",
        number: 3,
        code: "three",
        choices: [
            "I set specific achievable goals so I can stay focused",
            "I set goals with clear deadlines so I can finish them",
            "I set goals with performance objectives to help me improve",
            "I set general goals that help me improve in a certain direction, but nothing very specific",
            "Other",
        ]
    },
    {
        text: "What are some of the challenges you face when you work toward your goals? Check all that apply.",
        number: 4,
        code: "four",
        choices: [
            "Lack motivation to get started or to finish them",
            "Lack discipline to stay on track or to finish  them",
            "Not enough time ",
            "Lack of clear direction or focus",
            "Don't know where or how to start",
            "Procrastination",
            "Fear of failure or self-doubt",
            "Distractions (e.g. social media, friends, …)",
            "Goal is too big or complex",
            "Goal is not measurable so I can't tell how I'm doing",
            "Too many goals to accomplish at once",
            "Other",
        ]
    },
    {
        text: "Do you monitor your progress when you are working toward your goals or reflect on your experience after achieving them? Check all that apply.",
        number: 5,
        code: "five",
        choices: [
            "I get feedback or progress reports from my teacher, teaching assistant, or mentor",
            "I track my progress using a planner, journal, or other tracking tools",
            "I use assessment tools or quizzes to measure my progress",
            "I set intermediate milestones to check my progress along the way",
            "I review the feedback given to me because it helps identify the common mistakes so I can avoid them in the future",
            "I review the feedback given to me because it helps identify strategies to fix my mistakes",
            "My experience helps me change the way I set goals next time",
            "I don't monitor my progress; I only check when the goals are finished",
            "I don't monitor my progress and I don't check if the goals are finished",
        ]
    },
]
