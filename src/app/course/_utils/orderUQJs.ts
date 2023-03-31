import {UQJ} from "@app/_models"


export const orderQuestions = (uqjs: UQJ[]): UQJ[] =>  {
    const numsArr: UQJ[] = []
    const stringsArr: UQJ[] = []

    for (const uqj of uqjs) {
        if (containsNumbers(uqj.question.title))
            numsArr.push(uqj)
        else
            stringsArr.push(uqj)
    }

    numsArr.sort((a, b) => extractNumberFromString(a.question.title)
        - extractNumberFromString(b.question.title))

    stringsArr.sort((a, b) =>
        a.question.title.localeCompare(b.question.title))

    return numsArr.concat(stringsArr)
}

const containsNumbers = (str): boolean => {
    return str.match(/\d/) !== null
}

const extractNumberFromString = (str): number => {
    return +str.match(/(\d+)/)[0]
}
