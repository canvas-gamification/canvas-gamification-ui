import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProblemHelpersService {

    createMCQSubmissionRequest(formData, choices, variablesJSON, questionText, questionAnswer) {
        let mcqChoices = choices.value;
        mcqChoices.unshift(questionAnswer);
        mcqChoices = this.arrayToObject(mcqChoices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === questionAnswer);
        const submissionRequest = {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            answer: correctAnswer,
            category: formData.category,
            variables: variablesJSON,
            visible_distractor_count: formData.visible_distractor_count,
            choices: mcqChoices
        };
        return submissionRequest;
    }

    createJavaSubmissionRequest(formData, variablesJSON, inputFileNames, questionText) {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            category: formData.category,
            variables: variablesJSON,
            junit_template: formData.junit_template,
            input_file_names: inputFileNames,
        };
    }

    createParsonsSubmissionRequest(formData, variablesJSON, questionText) {
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            category: formData.category,
            variables: variablesJSON,
            lines: formData.lines.split('\n'),
            additional_file_name: formData.additional_file_name,
            junit_template: formData.junit_template,
        };
    }

    getNextLetter(char: string): string {
        let code = char.charCodeAt(0);
        code++;
        return String.fromCharCode(code);
    }

    arrayToObject(choicesArray: string[]): { [id: string]: string } {
        const choices = {};
        let id = 'a';
        for (const choice of choicesArray) {
            choices[id] = choice;
            id = this.getNextLetter(id);
        }
        return choices;
    }
}
