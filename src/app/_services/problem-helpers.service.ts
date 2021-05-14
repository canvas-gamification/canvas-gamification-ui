import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProblemHelpersService {

    constructor() {
    }

    createMCQSubmissionRequest(FormData, choices, variablesJSON) {
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

    createJavaSubmissionRequest(FormData, variablesJSON, inputFileNames, questionText) {
        return {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: questionText,
            category: FormData.category,
            variables: variablesJSON,
            junit_template: FormData.junit_template,
            input_file_names: inputFileNames,
        };
    }

    createParsonsSubmissionRequest(FormData, variablesJSON) {
        return {
            title: FormData.title,
            difficulty: FormData.difficulty,
            course: FormData.course,
            event: FormData.event,
            text: FormData.text,
            category: FormData.category,
            variables: variablesJSON,
            lines: FormData.lines.split('\n'),
            additional_file_name: FormData.additional_file_name,
            junit_template: FormData.junit_template,
        };
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
