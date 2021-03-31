import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonMcqFunctionsService {

    constructor() {
    }

    createSubmissionRequest(FormData, choices, variablesJSON) {
        let mcqChoices = choices.value;
        mcqChoices.unshift(FormData.answer);
        mcqChoices = this.arrayToObject(mcqChoices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === FormData.answer);
        const submissionRequest = {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            answer: correctAnswer,
            category: FormData.category,
            variables: variablesJSON,
            visible_distractor_count: FormData.visible_distractor_count,
            choices: mcqChoices
        };
        return submissionRequest;
    }

    getNextLetter(char) {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

    arrayToObject(choicesArray: string[]) {
        const choices = {};
        let id = 'a';
        for (const choice of choicesArray) {
            choices[id] = choice;
            id = this.getNextLetter(id);
        }
        return choices;
    }
}
