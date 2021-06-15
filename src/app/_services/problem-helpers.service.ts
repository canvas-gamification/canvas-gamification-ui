import {Injectable} from '@angular/core';
import {McqFormData} from "@app/problems/_models/mcq-form-data";
import {JavaFormData} from "@app/problems/_models/java-form-data";

@Injectable({
    providedIn: 'root'
})
export class ProblemHelpersService {

    createMCQSubmissionRequest(formData: McqFormData, choices: string[], variablesJSON: JSON[], questionText: string, questionAnswer: string) {
        choices.unshift(questionAnswer);
        const mcqChoices = this.arrayToObject(choices);
        const correctAnswer = Object.keys(mcqChoices).find(key => mcqChoices[key] === questionAnswer);
        return {
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
    }

    createCheckboxSubmissionRequest(formData: McqFormData, choices: string[], variablesJSON: JSON[], questionText: string, correctAnswers: string[]) {
        correctAnswers.forEach((answer) => {
            choices.unshift(answer);
        });
        const checkboxChoices = this.arrayToObject(choices);
        const correctAnswerKeys: string[] = [];
        correctAnswers.forEach((answer) => {
            correctAnswerKeys.push(Object.keys(checkboxChoices).find(key => checkboxChoices[key] === answer));
        });
        const correctAnswer = correctAnswerKeys.toString();
        return {
            title: formData.title,
            difficulty: formData.difficulty,
            course: formData.course,
            event: formData.event,
            text: questionText,
            answer: correctAnswer,
            category: formData.category,
            variables: variablesJSON,
            visible_distractor_count: formData.visible_distractor_count,
            choices: checkboxChoices
        };
    }

    createJavaSubmissionRequest(formData: JavaFormData, variablesJSON: JSON[], inputFileNames: JSON, questionText: string) {
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

    createParsonsSubmissionRequest(formData: {
        title: string,
        difficulty: string,
        course: string,
        event: string,
        category: string,
        lines: string,
        additional_file_name: string,
        junit_template: string
    }, variablesJSON: JSON[], questionText: string) {
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
