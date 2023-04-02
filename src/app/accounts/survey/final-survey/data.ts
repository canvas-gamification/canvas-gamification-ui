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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const S2AgreeQuestions: AgreeQuestion[] = [
    {
        text: "I used goals to help me figure out what I was good at and what I need to improve on.",
        code: "S2-A1",
    },
    {
        text: "I used goals to improve the speed at which I do programming questions.",
        code: "S2-A2",
    },
    {
        text: "I used goals to work on topics that I was not as good at.",
        code: "S2-A3",
    },
    {
        text: "I used goals to ensure I get in a good amount of practice on a regular basis.",
        code: "S2-A4",
    },
    {
        text: "Goals help me challenge myself and improve my skills overall.",
        code: "S2-A5",
    },
    {
        text: "I set goals before the exams as a way to help me study.",
        code: "S2-A6",
    },
    {
        text: "I set similar goals with my friends so we can compete with each other for fun.",
        code: "S2-A6",
    },
    {
        text: "Completing goals make me feel good about my accomplishments.",
        code: "S2-A7",
    },
    {
        text: "Setting goals helps me develop a study plan for the course.",
        code: "S2-A8",
    },
    {
        text: "When I complete questions in a goal, I like seeing an overview of how I did on the goal performance review.",
        code: "S2-A9",
    },
    {
        text: "The feedback on the goal performance review page helps me identify my common mistakes.",
        code: "S2-A10",
    },
    {
        text: "The feedback on the goal performance review page helps me figure out how I should fix my programming errors.",
        code: "S2-A11",
    },
    {
        text: "The feedback on the goal performance review page has too much information.",
        code: "S2-A12",
    },
    {
        text: "The feedback on the goal performance review page is too complicated.",
        code: "S2-A13",
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const S3AgreeQuestions: AgreeQuestion[] = [
    {
        text: "Seeing how well I did on the leaderboard motivated me to do more practice on the site.",
        code: "S3-A1",
    },
    {
        text: "I find leaderboards too competitive.",
        code: "S3-A2",
    },
    {
        text: "I found it really stressful to see how others did compared to me on the leaderboard.",
        code: "S3-A3",
    },
    {
        text: "I like having the anonymous option so my name does not appear on the leaderboards.",
        code: "S3-A4",
    },
    {
        text: "I know that there is a separate leaderboard for each challenge.",
        code: "S3-A5",
    },
    {
        text: "I know where to find the leaderboard for each challenge.",
        code: "S3-A6",
    },
]

// eslint-disable-next-line @typescript-eslint/naming-convention
export const S4AgreeQuestions: AgreeQuestion[] = [
    {
        text: "I would rather complete the challenges without a leaderboard.",
        code: "S4-A1",
    },
    {
        text: "I found completing the challenges helped me learn the programming concepts.",
        code: "S4-A2",
    },
    {
        text: "I liked doing the challenges because I could work with other people on the questions.",
        code: "S4-A3",
    },
    {
        text: "There should be more challenges available throughout the course.",
        code: "S4-A4",
    },
    {
        text: "There was too much work required to complete a challenge.",
        code: "S4-A5",
    },
    {
        text: "The challenges were a good way to help me study for exams.",
        code: "S4-A6",
    },
    {
        text: "I found it difficult to form a team for the challenges.",
        code: "S4-A7",
    },
    {
        text: "I learned more working in a team.",
        code: "S4-A8",
    },
]
